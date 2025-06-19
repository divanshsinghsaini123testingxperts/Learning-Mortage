using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.Contract;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class CustomFormsController : Controller
    {


        private readonly ICustomFormsRepository _customFormsRepository;
        private readonly IQuestionRepository _questionRepository;
        public CustomFormsController(ICustomFormsRepository customFormsRepository, IQuestionRepository questionRepository)
        {
            _customFormsRepository = customFormsRepository;
            _questionRepository = questionRepository;
        }
        ///--------------------Crud for questions -------------------- ///
        [HttpGet("GetQuestionsByFormId/{formId}")]
        public async Task<IActionResult> GetQuestionsByFormId(int formId)
        {
            var questions = await _questionRepository.GetByFormIdAsync(formId);
            return Ok(questions);
        }
        [HttpDelete("DeleteQuestion/{questionId}")]
        public async Task<IActionResult> DeleteQuestion(int questionId)
        {
            bool res = await _questionRepository.DeleteAsync(questionId);
            if (!res)
            {
                return NotFound("Question not found.");
            }
            await _questionRepository.SaveChangesAsync();
            return Ok("Question deleted successfully.");
        }
        [HttpPost("AddQuestion/{formId}")]
        public async Task<IActionResult> AddQuestion(int formId, [FromBody] Question question)
        {
            if (question == null || question.FormId != formId)
            {
                return BadRequest("Invalid question data or form ID mismatch.");
            }
            await _questionRepository.AddAsync(question);
            await _questionRepository.SaveChangesAsync();
            return Ok("Question added successfully.");
        }
        [HttpPut("UpdateQuestion/{questionId}")]
        public async Task<IActionResult> UpdateQuestion(int questionId, [FromBody] Question question)
        {
            if (question == null || question.Id != questionId)
            {
                return BadRequest("Invalid question data or question ID mismatch.");
            }
            else if (await _questionRepository.ExistsAsync(questionId) == false)
            {
                return NotFound("Question not found.");
            }
            var updateStatus = await _questionRepository.UpdateAsync(question);
            if (!updateStatus)
            {
                return NotFound("Failed to update question.");
            }
            await _questionRepository.SaveChangesAsync();
            return Ok("Question updated successfully.");
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

        [HttpPost("AddForm/{employeeId}")]
        public async Task<IActionResult> AddForm(int employeeId, [FromBody] CustomForm form)
        {
            if (form == null || form.AdminId != employeeId)
            {
                return BadRequest("Invalid form data or employee ID mismatch.");
            }
            await _customFormsRepository.AddAsync(form);
            await _customFormsRepository.SaveChangesAsync();
            return Ok("Form added successfully.");
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
