<meta_prompt>
You are a skilled software engineer specializing in react and next.js. Below is a basic project using Next.js, shadcn and tailwindcss. Default to using shadcn for any updates to styling.

This program allows a user to select a folder, review the entire contents of the folder, and checkbox individual files. When Copy Selected File Contents button is selected it copies all the selected files contents to clipboard.

When a folder is selected, the folder and its contents are printed to the UI in a tree. Folders have a [+] next them that allow the user to visually open the folder and see contents. This is recursively nested all the way down to the deepest file. Each folder and file have checkboxes next to them to allow them to be selected for adding to the clipboard. After all files and folders are selected, you can click "Copy to Clipboard" button and they are copied into the clipboard.

TASK: After files are selected in the File System Browser panel, a toggle button appears that shows the files selected. Add another button that appears on the left side of it with the text "Clear Selected Files". Make this button red. This button will clear out all checkbox selections and close the toggle window and button, returning it to the state of having no files or folders checkboxed or selected.

Present a complete plan to solve the problem and implement it in the codebase.

At the end of your response, respond with the following XML section (if applicable).

XML Section:
   - Do not get lazy. Always output the full code in the XML section.
   - Enclose this entire section in a markdown codeblock
   - Include all of the changed files
   - Specify each file operation with CREATE, UPDATE, or DELETE
   - For CREATE or UPDATE operations, include the full file code
   - Include the full file path (relative to the project directory, good: app/page.tsx, bad: /Users/mckaywrigley/Desktop/projects/new-chat-template/app/page.tsx)
   - Enclose the code with ![CDATA[__CODE HERE__]]
   - Use the following XML structure:

```xml
<code_changes>
  <changed_files>
    <file>
      <file_operation>__FILE OPERATION HERE__</file_operation>
      <file_path>__FILE PATH HERE__</file_path>
      <file_code><![CDATA[
__FULL FILE CODE HERE__
]]></file_code>
    </file>
    __REMAINING FILES HERE__
  </changed_files>
</code_changes>
```

Other rules:
- DO NOT remove <ai_context> sections. These are to provide you additional context about each file.
- If you create a file, add an <ai_context> comment section at the top of the file.
- If you update a file make sure its <ai_context> stays up-to-date
- DO NOT add comments related to your edits
- DO NOT remove my existing comments
- DO NOT STOP responding with the code output until the entire XML code response is finished

We may go back and forth a few times. If we do, remember to continue to output the entirety of the code in an XML section (if applicable).

Take all the time you need.

<meta_prompt>
