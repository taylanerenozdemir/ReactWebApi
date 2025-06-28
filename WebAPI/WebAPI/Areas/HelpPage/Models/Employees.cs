using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Areas.HelpPage.Models
{
	public class Employees
	{
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        public string MailID { get; set; }
        public DateTime?  DOJ { get; set; }
        //sonuna soru işareti ekleyerek nullable olabildiğini söylemiş olduk
    }
}