import os
import platform
import pathlib
platformName = platform.system()
print("Building for platform: " + platformName)
os.chdir(pathlib.Path(__file__).parent.resolve())

if platformName == "Windows":
    os.system("docker_build_windows.cmd")
    exit()
if platformName == "Linux":
    os.system("./docker_build_linux")
    exit()
