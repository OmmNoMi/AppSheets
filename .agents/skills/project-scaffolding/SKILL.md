---
name: project-scaffolding
description: Project templates, checklists, and foundational scaffolding for initializing or managing an AppSheet project. Use this skill when asked to create a new project, start an architecture, or review deployment readiness.
---
# Project Scaffolding & Templates
This skill contains the baseline templates for all OmmNoMi AppSheet projects.
All templates are stored in the `templates/` subdirectory.

## Available Templates:
- **BaseTemplateCore.xlsx**: The standard starting Google Sheet schema.
- **DeploymentChecklist.md**: The mandatory checklist before an app goes live.
- **Schema.md**: The markdown blueprint for mapping app data.
- **ProjectInfo.md**: Metadata tracker for the project.
- **Decisions.md**: Architecture decision record log.
- **Learnings.md**: Ongoing knowledge capture for the project.
- **TechnicalResponse.md**: Standardized technical communication template.

## Usage:
When initializing a new project, you MUST copy these templates to the project directory and instruct the user to duplicate the `BaseTemplateCore.xlsx` in Google Drive. You MUST use the `view_file` tool to read the specific templates if you need to reference their exact contents.
