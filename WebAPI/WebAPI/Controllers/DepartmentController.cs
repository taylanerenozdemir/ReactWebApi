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
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();

            string query = @"SELECT ID,DepartmentName FROM Departments";

            var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
            var queryResult = new SqlCommand(query, connection);
            using (var da = new SqlDataAdapter(queryResult))
            {
                queryResult.CommandType = CommandType.Text;
                da.Fill(dt);
            }

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        public string Post(Department dep)
        {
            try 
            {
                
                string query = @"INSERT INTO Departments VALUES ('"+dep.DepartmentName+@"')";
                

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                {
                    var queryResult = new SqlCommand(query, connection);
                    connection.Open();
                    queryResult.ExecuteNonQuery();
                    connection.Close();
                }
                //using bloğu belirli bir nesne ile işlem bitince onun bellekten silinmesini,
                //dispose edilmesini sağlar

                return "Added Succesfully!";
            }
            catch(Exception e)
            {
                return "Error"+e.Message;
            }
            
        }

        public string Put(Department dep)
        {
            try
            {
                string query = @"UPDATE Departments SET DepartmentName='" + dep.DepartmentName +
                    @"' WHERE ID=" + dep.ID + @"
                    ";

                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                {
                    var queryToSend = new SqlCommand(query, connection);
                    connection.Open();
                    queryToSend.ExecuteNonQuery();
                    connection.Close();
                };

                return "Updated Successfully";

            }catch(Exception e)
            {
                return "Error:" + e.Message;
            }
        }

        public string Delete(Department dep)
        {
            try
            {
                string query = @"DELETE FROM Departments WHERE ID=" + dep.ID;
                using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                {
                    var queryToSend = new SqlCommand(query, connection);
                    connection.Open();
                    queryToSend.ExecuteNonQuery();
                    connection.Close();
                };

                return "Deleted Successfully";
            }catch(Exception e)
            {
                return "Error" + e.Message;
            }
        }
    }
}
