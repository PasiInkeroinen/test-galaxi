using Microsoft.AspNetCore.Mvc;
using GaLaXiBackend.Data;

namespace GaLaXiBackend.Controllers
{
    [ApiController]
    [Route("api/computers")]
    public class ComputersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComputersController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get list of available computer IDs for a given time range.
        /// </summary>
        /// <param name="start">Start time of desired booking</param>
        /// <param name="end">End time of desired booking</param>
        [HttpGet("available")]
        public IActionResult GetAvailableComputers([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (start >= end)
                return BadRequest("Start time must be before end time.");

            var bookedComputerIds = _context.Bookings
                .Where(b => b.StartTime < end && b.EndTime > start && b.ComputerId != null)
                .Select(b => b.ComputerId!.Value)
                .Distinct()
                .ToList();

            var allComputerIds = Enumerable.Range(1, 5); // Assuming 5 computers: 1-5
            var available = allComputerIds.Except(bookedComputerIds);

            return Ok(available);
        }
    }
}
