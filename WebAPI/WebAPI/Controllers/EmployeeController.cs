using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Areas.HelpPage.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            string query = @"SELECT EmployeeID,EmployeeName,Department,MailID,CONVERT(varchar(10),DOJ,120) AS DOJ FROM Employees;";
            var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
            var queryResult = new SqlCommand(query, connection);

            using (var da = new SqlDataAdapter(queryResult))
            {
                queryResult.CommandType = CommandType.Text;
                da.Fill(dt);
            }

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        public string Post(Employees employee)
        {
            try
            {
                string formattedDate = employee.DOJ.Value.ToString("yyyy-MM-dd");

                string query = @"INSERT INTO Employees (EmployeeName, Department, MailID, DOJ) VALUES (
                '" + employee.EmployeeName + @"',
                '" + employee.Department + @"',
                '" + employee.MailID + @"',
                '" + formattedDate + @"'
        )";

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                {
                    var command = new SqlCommand(query, connection);
                    connection.Open();
                    command.ExecuteNonQuery(); // ← asıl işlem burada
                    connection.Close();
                }

                return "Added Successfully!";
            }
            catch (Exception e)
            {
                return "Failed To Add: " + e.Message; // Hata mesajını görmek istersen
            }
        }

        public string Put(Employees e)
        {
            string formattedDate = e.DOJ.Value.ToString("yyyy-MM-dd");
            try
            {
                string query = @"UPDATE Employees SET
                EmployeeName='" + e.EmployeeName + @"',
                Department='" + e.Department + @"',
                MailID='" + e.MailID + @"',
                DOJ='" + formattedDate + @"'
                WHERE EmployeeID="+e.EmployeeID;

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                {
                    var queryToSend = new SqlCommand(query, connection);
                    connection.Open();
                    queryToSend.ExecuteNonQuery();
                    connection.Close();
                };

                return "Updated Successfully";

                   

            }
            catch(Exception ex)
            {
                return "Error" + ex.Message;
            }
        }

        public string Delete(Employees emp)
        {
            try
            {
                string query = @"DELETE FROM Employees WHERE EmployeeID=" + emp.EmployeeID;
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                {
                    var queryToSend = new SqlCommand(query, connection);
                    connection.Open();
                    queryToSend.ExecuteNonQuery();
                    connection.Close();
                }

                return "Deleted Successfully";
            }catch(Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

    }
}
