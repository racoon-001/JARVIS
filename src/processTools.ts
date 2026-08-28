import { exec } from "child_process";

export function getRunningProcesses(): Promise<string> {
  return new Promise((resolve) => {
    exec(
      'powershell -Command "Get-Process | Select-Object -First 20 Name,Id,CPU | Format-Table -AutoSize"',
      (error, stdout) => {
        if (error) {
          resolve(" I couldn't retrieve running processes, ma'am.");
          return;
        }

        resolve(stdout);
      }
    );
  });
}

export function checkProcess(processName: string): Promise<string> {
  return new Promise((resolve) => {
    exec(
      `powershell -Command "Get-Process -Name '${processName}' -ErrorAction SilentlyContinue | Select-Object Name,Id"`,
      (error, stdout) => {
        if (error || !stdout.trim()) {
          resolve(` ${processName} is not currently running, ma'am.`);
          return;
        }

        resolve(` ${processName} is currently running, ma'am.\n${stdout}`);
      }
    );
  });
}