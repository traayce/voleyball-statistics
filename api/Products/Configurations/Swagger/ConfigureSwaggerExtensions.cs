using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace Api.Configurations.Swagger
{
    public static class ConfigureSwaggerExtension
    {
        public static void Configure(this SwaggerGenOptions options)
        {
            options.DocInclusionPredicate((docName, apiDesc) =>
            {
                var actionApiVersionModel = apiDesc.ActionDescriptor?.GetApiVersion();
                if (actionApiVersionModel == null)
                {
                    return true;
                }
                if (actionApiVersionModel.DeclaredApiVersions.Any())
                {
                    return actionApiVersionModel.DeclaredApiVersions.Any(v => $"v{v.ToString()}" == docName);
                }

                return actionApiVersionModel.ImplementedApiVersions.Any(v => $"v{v.ToString()}" == docName);
            });
            
            options.SwaggerDoc("v1.0", new Info { Title = "API", Version = "v1.0" });
            options.SwaggerDoc("v1.1", new Info { Title = "API", Version = "v1.1" });
            options.OperationFilter<SwaggerApiVersionOperationFilter>();
        }

        public static void ConfigureSwaggerUi(this SwaggerUIOptions options)
        {
            options.SwaggerEndpoint("/swagger/v1.0/swagger.json", "API V1.0");
            options.SwaggerEndpoint("/swagger/v1.1/swagger.json", "API v1.1");
            options.RoutePrefix = string.Empty;
        }
    }
}