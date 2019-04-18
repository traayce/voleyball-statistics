using System;
using System.Collections.Generic;

namespace Infrastructure
{
    public class RulesException : Exception
    {
        public IEnumerable<ErrorInfo> Errors { get; private set; }
        public int? StatusCode { get; private set; }
        
        public RulesException()
        {
            Errors = new List<ErrorInfo>();
        }

        public RulesException(IEnumerable<ErrorInfo> errors)
        {
            Errors = errors;
        }
		
        public RulesException(string errorMessage) : this(errorMessage, 400)
        {
        }

        public RulesException(string errorMessage, int statusCode) : this(string.Empty, errorMessage)
        {
            StatusCode = statusCode;
        }

        public RulesException(string propertyName, string errorMessage)
        {
            Errors = new[] { new ErrorInfo(propertyName, errorMessage) };
        }
    }
    
    public class ErrorInfo
    {
        public string PropertyName { get; private set; }
        public string ErrorMessage { get; private set; }

        public ErrorInfo(string propertyName, string errorMessage)
        {
            PropertyName = propertyName;
            ErrorMessage = errorMessage;
        }
    }
}