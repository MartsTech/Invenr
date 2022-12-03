using System.Collections;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.FeatureManagement;
using Microsoft.FeatureManagement.Mvc;

namespace WebApi.Services.FeatureFlags;

public sealed class FeatureFlagsControllerFeatureProvider : IApplicationFeatureProvider<ControllerFeature>
{
    private readonly IFeatureManager _featureManager;

    public FeatureFlagsControllerFeatureProvider(IFeatureManager featureManager)
    {
        _featureManager = featureManager;
    }

    public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
    {
        for (var i = feature.Controllers.Count - 1; i >= 0; i--)
        {
            var controller = feature.Controllers[i].AsType();

            foreach (var customAttribute in controller.CustomAttributes)
            {
                if (customAttribute.AttributeType.FullName != typeof(FeatureGateAttribute).FullName)
                {
                    continue;
                }

                var constructorArgument = customAttribute.ConstructorArguments.First();

                if (constructorArgument.Value is not IEnumerable arguments)
                {
                    continue;
                }

                foreach (var argumentValue in arguments)
                {
                    var typedArgument = (CustomAttributeTypedArgument)argumentValue!;

                    var typedArgumentValue = (FeatureFlagsList)(int)typedArgument.Value!;

                    var isFeatureEnabled = _featureManager
                        .IsEnabledAsync(typedArgumentValue.ToString())
                        .ConfigureAwait(false)
                        .GetAwaiter()
                        .GetResult();

                    if (!isFeatureEnabled)
                    {
                        feature.Controllers.RemoveAt(i);
                    }
                }
            }
        }
    }
}