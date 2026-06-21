### mlops steps
https://youtu.be/Tb6euREu8D0?si=zQXzh2d5-gc_qRI0

1. git clone https://github.com/marvelousmlops/marvel-characters.git
2. Create three catalogs
mlops_dev, mlops_acc, mlops_prod
3. Create one schema per catalog
marvel_characters
4. install databricks cli
brew tap databricks/tap  
brew install databricks
5. create a profile
databricks auth login --host https://dbc-97b48e59-991b.cloud.databricks.com/
6. install the databricks extension in vscode
7. when you click on the extension, you see "invalid host"
8. Update the host in databricks.yml with https://dbc-97b48e59-991b.cloud.databricks.com/
argets:
  dev:
    default: true
    mode: development
    workspace:
      host: <your host>
      root_path: /Workspace/Users/${workspace.current_user.userName}/.bundle/${bundle.target}/${bundle.name}
    variables:
      schedule_pause_status: PAUSED

  acc:
    presets:
      name_prefix: 'acc_'
    workspace:
      host: <your host>
      root_path: /Shared/.bundle/${bundle.target}/${bundle.name}
    variables:
      schedule_pause_status: PAUSED

  prd:
    mode: production
    workspace:
      host: <your host>
      root_path: /Shared/.bundle/${bundle.target}/${bundle.name}
    variables:
      schedule_pause_status: PAUSED # normally UNPAUSED
9. install uv: uv is an extremely fast, all-in-one Python package and project manager written in Rust. Developed by Astral, the creators of the popular ruff linter, uv is designed to be a single, high-performance replacement for a chaotic ecosystem of separate tools including pip, pip-tools, pipx, poetry, pyenv, twine, and virtualenv.
brew install uv
10. uv sync --extra dev     
It installs or updates all base project dependencies plus any packages specifically listed under the dev extra (like linters, formatters, or testing frameworks) so that they are perfectly resolved and pinned to your lock file.The dev Extra: In standard pyproject.toml or uv.lock configurations, an extra named dev defines optional, development-only requirements.Usage Context: Running uv sync --extra dev is especially common when working on a cloned repository so your local virtual environment mirrors the exact package states the author intended.For more details on optional dependency states and group configurations, check out the Astral uv Sync Documentation.2 sitesLocking and syncing | uv - Astral Docsuv does not sync extras by default. Use the --extra option to include an extra. $ uv sync --extra foo. To quickly enable all extra...docs.astral.shWhy Python Developers Are Switching to UVAug 7, 2025 — if you're a Python developer. and you are still using pip instead of UV. then it's time for an upgrade. so UV is a super fast Pyth...9:23YouTube·Dave EbbelaarHow uv sync works and why it's powerful | Danial raza posted on ...Nov 8, 2025 — The uv sync command is a core feature of uv, the fast Python package installer and resolver written in Rust. Its primary purpose i...www.linkedin.comShow allDive deeper in AI Mode   
11. In vscode, in databricks extension, click "select cluster" and use "serverless"  
12. Use GitFolder to interact with our codebase
12.a Select workspace on databricks, create a git folder
12.b pass the name of the repo https://github.com/marvelousmlops/marvel-characters.git
13. In Databricks, under workspace, go to marvel-characters go to notebooks and open lecture2.marvel_data_preprocessing
14. Notice that serverless compute has a environment version.
Serverless environment versions: https://docs.databricks.com/aws/en/release-notes/serverless/environment-version
there is icon on the right side that you can check the environment version you are on.
15. Change the environment version to standard base 3
16. Install the libraries (run the first cell of the notebook)
17. Adjust the system path (run the second cell of the notebook) other it won't find the module
18. run the third cell of the notebook
19. The marvel character data is coming from https://www.kaggle.com/datasets/amirdhavarshinis/marvel-characters
20. Go to vscode and open the lecture2.marvel_data_preprocessing
Notice that package installation are commented out. This is because settings.json under .vscode
{
    "jupyter.interactiveWindow.cellMarker.codeRegex": "^# COMMAND ----------|^# Databricks notebook source|^(#\\s*%%|#\\s*\\<codecell\\>|#\\s*In\\[\\d*?\\]|#\\s*In\\[ \\])",
    "jupyter.interactiveWindow.cellMarker.default": "# COMMAND ----------"
}
21. All the modules(classes) and models are under src/marvel_characters
22. Fix the paths so it assumes they are running from the current directory
23. Run the /Users/hoomanator/marvel-characters/notebooks/lecture2.marvel_data_preprocessing.py from vscode using "Databricks Run"
24. Notice that we are using databricks connect and it has pyspark embedded in it
25. Do not install pyspark, because it will have a conflict with pyspark in data bricks
26. Go to marvel_characters schema in mlops_dev, and you should see train and test data.
27. In vscode, in the databricks extension, there is a "remote folder" tab. You can use that(click on syn icon) to synchronize your files to the workspace. If you go to the databricks, workspace, there is a .bundle folder, under dev folder, that you should Marvel Characters folder with all of our files.
28. Use "uv build" command to create a package in "dist"
29. move /Users/hoomanator/marvel-characters/notebooks/marvel_characters-0.1.0-py3-none-any.whl to notebooks folder
30. Make sure it's synced to the workspace
31. Go to the databricks, open a notebook, and install the wheel file
pip install marvel_characters-0.1.0-py3-none-any.whl in a cell
Note: make sure that the environment version is set to 3, otherwise will fail

### MLFLOW
experiment tracking happens in the workspace, but model registry happens in Unity Catalog. All MLflow runs logged in an active experiment.

MLflow experiment x--|----> MLflow Run a --> Model Version 1
                     |
                     |----> MLflow Run b --> Model Version 2
                     |
                     |----> MLflow Run C --> Model Version 3

1. Open lecture3.mlflow_experiment_tracking.py in vscode   
2. Run the first cell in vscode
3. Run the second cell
4. Run the third cell
5. databricks://None (because it can't find your profile)
6. In the main directory, create .env file and set your profile

PROFILE=dbc-97b48e59-991b

7. Run the third cell again, you should see
# COMMAND ----------
if not is_databricks():
    load_dotenv()
    profile = os.environ.get("PROFILE")
    mlflow.set_tracking_uri(f"databricks://{profile}")
    mlflow.set_registry_uri(f"databricks-uc://{profile}")

mlflow.get_tracking_uri()

you should see
databricks://dbc-97b48e59-991b

this is the profile to authenticate the databricks

8. ctrl+shift+p to open the Command Palette,
type and select PreferencesLOpen User Settings(JSON)
add the following configuration
"python.terminal.useEnvFile": true

restart the vscode

8. Run the 4th cell to set the experiment
experiment = mlflow.set_experiment(experiment_name="/Shared/marvel-demo")
mlflow.set_experiment_tags({"repository_name": "marvelousmlops/marvel-characters"})

print(experiment)

5. Open /Users/hoomanator/marvel-characters/demo_artifacts/mlflow_experiment.json
6. Install JSON Lens or JSON Crack extension in vscode to see it visually
Right click on the json file and view it visually

Note: you might have to delete mlflow_experiment.json first

7. You can search experiment with id
# get experiment by id
mlflow.get_experiment(experiment.experiment_id)

8. You can search experiment with a tag
experiments = mlflow.search_experiments(
    filter_string="tags.repository_name='marvelousmlops/marvel-characters'"
)
print(experiments)

9. Start a run
# start a run
mlflow.start_run()

10. get active run
print(mlflow.active_run().__dict__)

11. end the run
mlflow.end_run()
print(mlflow.active_run() is None)

12. after the run, go and see the experiment
View experiment at: https://dbc-97b48e59-991b.cloud.databricks.com/ml/experiments/4367869166392673

notice that there is no artifacts in the artifact tab

13. # start a run
with mlflow.start_run(
    run_name="marvel-demo-run",
    tags={"git_sha": "1234567890abcd"},
    description="marvel character prediction demo run",
) as run:
    run_id = run.info.run_id
    mlflow.log_params({"type": "marvel_demo"})
    mlflow.log_metrics({"metric1": 1.0, "metric2": 2.0})


14. run_info = mlflow.get_run(run_id=run_id).to_dictionary()
print(run_info)

# COMMAND ----------
with open("./demo_artifacts/run_info.json", "w") as json_file:
    json.dump(run_info, json_file, indent=4)

# COMMAND ----------
print(run_info["data"]["metrics"])

# COMMAND ----------
print(run_info["data"]["params"])

go to run_info.json and see it using creditlens
also go to Experiments in Databricks and see it there.

15. Reactivate the old run
mlflow.start_run(run_id=run_id)

16. add more parameters
# COMMAND ----------
# this will fail: not allowed to overwrite value
mlflow.log_param("type", "marvel_demo2")
# COMMAND ----------
mlflow.log_param(key="purpose", value="get_certified")
mlflow.end_run()