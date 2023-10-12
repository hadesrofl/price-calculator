using Autofac;
using Price_Calculator.Backend.Core.Interfaces;
using Price_Calculator.Backend.Core.Services;

namespace Price_Calculator.Backend.Core;

/// <summary>
/// An Autofac module that is responsible for wiring up services defined in the Core project.
/// </summary>
public class DefaultCoreModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterType<DeleteContributorService>()
            .As<IDeleteContributorService>().InstancePerLifetimeScope();
    }
}