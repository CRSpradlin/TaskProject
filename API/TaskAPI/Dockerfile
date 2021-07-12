#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /app
EXPOSE 5000
EXPOSE 80
EXPOSE 443

# FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
# COPY ["TaskAPI/TaskAPI.csproj", "TaskAPI/"]
# RUN dotnet restore "TaskAPI/TaskAPI.csproj"
COPY . .
WORKDIR "/app/TaskAPI"
# RUN dotnet build "TaskAPI.csproj" -c "Development" -o /app/build

# FROM build AS publish
# RUN dotnet publish "TaskAPI.csproj" -c "Development" -o /app/publish

# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "TaskAPI.dll"]

ENV ASPNETCORE_ENVIRONMENT=Docker


ENTRYPOINT [ "dotnet", "run", "--project", "TaskAPI.csproj" ]
# ENTRYPOINT ["dotnet", "run", "-c", "Debug"]
