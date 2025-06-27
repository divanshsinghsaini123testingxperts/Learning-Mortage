using Amazon.Runtime.Internal.Auth;
using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.Contract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using Backend.Services;

using Backend.Models.Entity;
namespace Backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CustomFormsController : Controller
    {

        private readonly TranslationService _translatorService;
        private readonly ICustomFormsRepository _customFormsRepository;
        private readonly IQuestionRepository _questionRepository;
        public CustomFormsController(ICustomFormsRepository customFormsRepository, IQuestionRepository questionRepository , TranslationService TraService)
        {
            _customFormsRepository = customFormsRepository;
            _questionRepository = questionRepository;
            _translatorService = TraService;
        }
        ///-------------Endpoint for translator ----------------------/// 
        [HttpPost]
        public async Task<IActionResult> Translate([FromBody] TranslationRequest request)
        {
            var result = await _translatorService.TranslateAsync(request.Text, request.SourceLang, request.TargetLang);
            return Ok(new { translated = result });
        }
        ///--------------------Crud for questions -------------------- ///
        [HttpGet("GetQuestionsByFormId/{formId}")]
        public async Task<IActionResult> GetQuestionsByFormId(int formId)
        {
            var questions = await _questionRepository.GetByFormIdAsync(formId);

            // Convert Options from string to array (split by '^')
            var result = questions.Select(q => new
            {
                q.Id,
                q.EngQuestion,
                q.FrenchQuestion,
                q.AnswerFormat,
                q.FormId,
                // Split Options string into array, handle null/empty
                Options = string.IsNullOrEmpty(q.Options) ? Array.Empty<string>() : q.Options.Split('^'),
                q.Form
            }).ToList();

            return Ok(result);
        }

        [HttpPost("AddQuestion/{formId}")]
        public async Task<IActionResult> AddQuestion(int formId, [FromBody] List<QuestionDto> questions)
        {

            if(formId == 0)
            {
                return BadRequest("Form id is zero ");
            }

            foreach(var ques in questions)
            {
                if (ques == null || ques.EngQuestion == "")
                {
                    //return BadRequest("one question is not complete ");
                    continue; 
                }
               
                Console.WriteLine(ques.FormId);
                var newques = new Question();
                newques.FormId = formId;
                newques.Id = ques.Id;

                newques.EngQuestion = ques.EngQuestion;
                newques.FrenchQuestion = ques.FrenchQuestion;
                newques.AnswerFormat = ques.AnswerFormat;
                newques.Options = string.Join('^', ques.Options ?? new List<string>());
                 await _questionRepository.AddAsync(newques);
            }
            await _questionRepository.SaveChangesAsync();
            return Ok("All Questions added successfully.");
        }
        [HttpPut("UpdateQuestion/{FormId}")]
        public async Task<IActionResult> UpdateQuestion(int FormId, [FromBody] List<QuestionDto> questions)
        {
            // Get all existing questions for the form from the DB
            var existingQuestions = await _questionRepository.GetByFormIdAsync(FormId);

            // Find IDs in the incoming list
            var incomingIds = questions.Where(q => q.Id != 0).Select(q => q.Id).ToHashSet();

            // 1. Update or Add
            foreach (var dto in questions)
            {
                dto.FormId = FormId; // Ensure FormId is set

                var entity = new Question
                {
                    Id = dto.Id,
                    EngQuestion = dto.EngQuestion,
                    FrenchQuestion = dto.FrenchQuestion,
                    AnswerFormat = dto.AnswerFormat,
                    FormId = FormId,
                    Options = string.Join('^', dto.Options ?? new List<string>())
                };

                if (dto.Id == 0)
                {
                    // New question, add it
                    await _questionRepository.AddAsync(entity);
                }
                else
                {
                    // Existing question, update it
                    await _questionRepository.UpdateAsync(entity);
                }
            }

            // 2. Delete questions not in the incoming list
            var toDelete = existingQuestions.Where(q => !incomingIds.Contains(q.Id)).ToList();
            foreach (var question in toDelete)
            {
                await _questionRepository.DeleteAsync(question.Id);
            }

            await _questionRepository.SaveChangesAsync();
            return Ok("Questions updated successfully.");
        }
        /// --------------------Crud for forms -------------------- ///
        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetFormsByEmployeeId(int employeeId)
        {
            var Forms = await _customFormsRepository.GetByEmployeeIdAsync(employeeId);
            return Ok(Forms);
        }
        [HttpDelete("{formId}")]
        public async Task<IActionResult> DeleteForm(int formId)
        {

            bool res = await _customFormsRepository.DeleteAsync(formId);
            if (!res)
            {
                return NotFound("Form not found.");
            }
            await _customFormsRepository.SaveChangesAsync();
            return Ok("Form deleted successfully.");
        }

        [HttpPost("AddForm")]
        public async Task<IActionResult> AddForm( [FromBody] CustomForm form)
        {
            if (form == null )
            {
                return BadRequest("Invalid form data or employee ID mismatch.");
            }
            await _customFormsRepository.AddAsync(form);
            await _customFormsRepository.SaveChangesAsync();

            return Ok(new { message = "Form added successfully.", formId = form.Id });
        }
        
        [HttpPut("UpdateForm/{formId}")]
        public async Task<IActionResult> UpdateForm(int formId, [FromBody] CustomForm form)
        {
            if (form == null || form.Id != formId)
            {
                return BadRequest("Invalid form data or form ID mismatch.");
            }
            else if (await _customFormsRepository.ExistsAsync(formId) == false)
            {
                return NotFound("Form not found.");
            }
            var updateStatus = await _customFormsRepository.UpdateAsync(form);
            if (!updateStatus)
            {
                return NotFound("failed to update.");
            }
            await _customFormsRepository.SaveChangesAsync();
            return Ok("Form updated successfully.");
        }
        [HttpGet("GetFormById/{formId}")]
        public async Task<IActionResult> GetFormById(int formId)
        {
            var form = await _customFormsRepository.GetByIdAsync(formId);
            if (form == null)
            {
                return NotFound("Form not found.");
            }
            return Ok(form);

        }
    }
}
