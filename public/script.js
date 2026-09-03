// Task class
class Task {
    constructor(name, id) {
        this.name = name
        this.id = id
    }
}

// Task ID to Task Mapping
let taskIdToTaskMapping = {}

// Global Repeatable Tasks raw
let globalRepeatableTasks = ""

// Global Repeatable Tasks Array 
let globalRepeatableTasksArr = []

// Task ID to atomic tasks mapping
let taskIDToAtomicTasksMapping = {}

let completedTaskIdToJsonMapping = {}

let completedTasks = []

let oneTimeTaskIdToNameMapping = {}

let globalOneTimeTasksArr = []

let completedOneTimeTaskIdToJsonMapping = {}

let taskIDToAtomicTasksOneTimeMapping = {}

const focusTitleHtmlConst = "Focus title goes here"

const atomicTaskHtmlConst = "Task id goes here"

const focusTypeHtmlConst = "Type goes here"

let taskNameToSheetsId = {}

let loadedAtomicTasks = false

// Dummy log to console function
function logToConsole() {
    console.log("Hello world")
}

function logToConsole(text) {
    console.log(text)
}

// Experimental import
const fileInputRepeatableExperimental = document.getElementById('fileInputRepeatableExperimental')

fileInputRepeatableExperimental.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();          // modern way

    const jsonText = JSON.parse(text)

    completedTaskIdToJsonMapping = jsonText["completedTaskIdToJsonMapping"]
    globalRepeatableTasksArr = jsonText["globalRepeatableTasks"]
    taskIDToAtomicTasksMapping = jsonText["taskIdToAtomicTasksMapping"]
})

// Read file input for one time tasks
const fileInputOneTime = document.getElementById('fileInputOneTime');

// Handle file input from user
fileInputOneTime.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();          // modern way

    const jsonText = JSON.parse(text)

    if ("completedOneTimeTaskIdToJsonMapping" in jsonText) {
        completedOneTimeTaskIdToJsonMapping = jsonText["completedOneTimeTaskIdToJsonMapping"]
    }
    if ("globalOneTimeTasksArr" in jsonText) {
        globalOneTimeTasksArr = jsonText["globalOneTimeTasksArr"]
    }
    if ("taskIDToAtomicTasksOneTimeMapping" in jsonText) {
        taskIDToAtomicTasksOneTimeMapping = jsonText["taskIDToAtomicTasksOneTimeMapping"]
    }

    renderOneTimeTasksList(globalOneTimeTasksArr)
});

function handleOneTimeTaskOnclick(text, generatedId) {
    updateFocusArea(text, generatedId, "one_time")
    if (generatedId in taskIDToAtomicTasksOneTimeMapping) {
        populateAtomicTasksInFocusArea(taskIDToAtomicTasksOneTimeMapping[generatedId])
    } else {
        populateAtomicTasksInFocusArea([])
    }
}

function updateFocusArea(focusTitle, taskId, type) {
    updateFocusTitle(focusTitle)
    updateFocusTaskId(taskId)
    updateFocusType(type)
}

function resetFocusArea() {
    updateFocusArea(focusTitleHtmlConst, atomicTaskHtmlConst, focusTypeHtmlConst)
    //focus-atomic-tasks
    const resetFocusAtomicTasks = document.getElementById("focus-atomic-tasks")
    resetFocusAtomicTasks.innerText = ""
}

function updateFocusTitle(focusTitle) {
    const focusTitleElem = document.getElementById("focus-title")
    focusTitleElem.innerText = focusTitle
}

function updateFocusTaskId(taskId) {
    const focusTitleElem = document.getElementById("atomic-task-id")
    focusTitleElem.innerText = taskId
}

function updateFocusType(type) {
    const focusTypeElem = document.getElementById("focus-type")
    focusTypeElem.innerText = type
}

const datetimeInputStart = document.getElementById("datetimeInputStart");

const datetimeInputEnd = document.getElementById("datetimeInputEnd");
datetimeInputEnd.addEventListener("change", () => {
    if (globalRepeatableTasks === "" && globalRepeatableTasksArr.length == 0) {
        alert("No repeatable tasks")
    } else if (datetimeInputStart.value === "") {
        alert("No start date time")
    } else if (datetimeInputEnd.value === "") {
        alert("No end date time")
    } else if (startTimeIsAfterEndTime(datetimeInputStart.value, datetimeInputEnd.value)) {
        alert("Start time after end time")
    } else {
        renderRepeatableTasksList(globalRepeatableTasksArr)
    }
});

// Helper function to check if first date comes after second date. 
function startTimeIsAfterEndTime(startTime, endTime) {
    return startTime > endTime
}

function handleFileContentRepeatable(fileContent) {
    globalRepeatableTasks = fileContent
}

function populateRepeatableTasksUnorderedList(fileContent) {
    const splittedContents = fileContent.split("\n")
    globalRepeatableTasksArr = []
    for (let i = 0; i < splittedContents.length; i++) {
        const generatedIdTmp = generateId()
        const newTask = new Task(splittedContents[i], generatedIdTmp)
        globalRepeatableTasksArr.push(newTask)
    }
    renderRepeatableTasksList(globalRepeatableTasksArr)
}

function renderRepeatableTasksList(taskObjects) {
    const ulUnorderedList = document.getElementById("unordered_list")
    ulUnorderedList.innerHTML = ""
    for (let i = 0; i < taskObjects.length; i++) {
        const newTask = taskObjects[i]
        const liItem = document.createElement("li")
        const buttonItem = document.createElement("button")
        buttonItem.innerText = newTask.name
        buttonItem.onclick = (e) => {
            handleRepeatableOnclick(e.target.innerText, i, newTask.id)
        }
        liItem.appendChild(buttonItem)
        ulUnorderedList.appendChild(liItem)
    }
}

function renderOneTimeTasksList(taskObjects) {
    const ulUnorderedList = document.getElementById("unordered_list_one_time")
    ulUnorderedList.innerHTML = ""
    for (let i = 0; i < taskObjects.length; i++) {
        const newTask = taskObjects[i]
        const liItem = document.createElement("li")
        const buttonItem = document.createElement("button")
        buttonItem.innerText = newTask.name
        buttonItem.onclick = (e) => {
            handleOneTimeTaskOnclick(newTask.name, newTask.id)
        }
        liItem.appendChild(buttonItem)
        ulUnorderedList.appendChild(liItem)
    }
}

function handleRepeatableOnclick(innerText, index, generatedIdTmp) {
    updateFocusArea(innerText, generatedIdTmp, "repeatable")
    if (generatedIdTmp in taskIDToAtomicTasksMapping) {
        populateAtomicTasksInFocusArea(taskIDToAtomicTasksMapping[generatedIdTmp])
    } else {
        populateAtomicTasksInFocusArea([])
    }
}

function populateAtomicTasksInFocusArea(atomicTasks) {
    const ulAtomicTasks = document.getElementById("focus-atomic-tasks")
    ulAtomicTasks.innerHTML = ""
    for (let i = 0; i < atomicTasks.length; i++) {
        const liElem = document.createElement("li")
        liElem.innerText = atomicTasks[i]
        ulAtomicTasks.appendChild(liElem)
    }
}

function addItemToTodoList() {
    const textInput = document.getElementById("textInput")
    const textInputText = textInput.value
    const ulUnorderedList = document.getElementById("unordered_list")
    const liItem = document.createElement("li")
    liItem.innerText = textInputText
    ulUnorderedList.appendChild(liItem)
}

function exportDataRepeatables() {
    const ulUnorderedList = document.getElementById("unordered_list")
    var toExportData = []
    for (let i = 0; i < ulUnorderedList.children.length; i++) {
        toExportData.push(ulUnorderedList.children[i].innerText)
    }
    let payload = ""
    for (let i = 0; i < toExportData.length; i++) {
        payload += toExportData[i]
        payload += "\n"
    }

    let jsonPayload = {}
    let grtaJson = []
    for (let i = 0; i < globalRepeatableTasksArr.length; i++) {
        grtaJson.push({
            "id": globalRepeatableTasksArr[i].id,
            "name": globalRepeatableTasksArr[i].name
        })
    }
    jsonPayload["globalRepeatableTasks"] = grtaJson
    jsonPayload["taskIdToAtomicTasksMapping"] = taskIDToAtomicTasksMapping
    jsonPayload["completedTaskIdToJsonMapping"] = completedTaskIdToJsonMapping
    downloadTextFile("exportsRepeatable.json", JSON.stringify(jsonPayload))
}

function exportOneTimeData() {
    const jsonPayload = {
        "taskIDToAtomicTasksOneTimeMapping": taskIDToAtomicTasksMapping,
        "completedOneTimeTaskIdToJsonMapping": completedOneTimeTaskIdToJsonMapping,
        "globalOneTimeTasksArr": globalOneTimeTasksArr
    }
    downloadTextFile("exportsOneTime.json", JSON.stringify(jsonPayload))
}

function downloadTextFile(filename, text) {
    // Create a Blob containing the text
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

    // Create a temporary object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a hidden <a> element
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;          // suggested filename
    a.style.display = 'none';

    // Append, click, and remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up the object URL
    URL.revokeObjectURL(url);
}

function addToFocusTaskList() {
    const inputTextElem = document.getElementById("atomic-task-input")
    const ulTextElem = document.getElementById("focus-atomic-tasks")
    const liItem = document.createElement("li")
    liItem.innerText = inputTextElem.value
    ulTextElem.appendChild(liItem)
    inputTextElem.value = ""
}

function markTaskAsCompleted() {
    // atomic-task-id
    const atomicTaskElem = document.getElementById("atomic-task-id")
    const atomicTaskElemId = atomicTaskElem.innerText
    if (atomicTaskElemId === atomicTaskHtmlConst) {
        alert("Please select a task first")
    }
    let atomicTasks = []
    // focus-type
    const focusTypeElem = document.getElementById("focus-type")
    const focusType = focusTypeElem.innerText
    if (focusType === "repeatable") {
        if (atomicTaskElemId in taskIDToAtomicTasksMapping) {
            atomicTasks = taskIDToAtomicTasksMapping[atomicTaskElemId]
            delete taskIDToAtomicTasksMapping[atomicTaskElemId]
        }
        for (let i = 0; i < globalRepeatableTasksArr.length; i++) {
            if (globalRepeatableTasksArr[i].id === atomicTaskElemId) {
                const indexToSplice = i
                const removedTask = globalRepeatableTasksArr.splice(indexToSplice, 1)[0]
                renderRepeatableTasksList(globalRepeatableTasksArr)
                resetFocusArea()
                alert("Task has been marked as completed")
                const packagedData = {
                    "completed_task": {
                        "id": removedTask.id,
                        "name": removedTask.name
                    },
                    "atomic_tasks": atomicTasks
                }
                completedTaskIdToJsonMapping[atomicTaskElemId] = packagedData
                break
            }
        }
    } else if (focusType === "one_time") {
        if (atomicTaskElemId in taskIDToAtomicTasksOneTimeMapping) {
            atomicTasks = taskIDToAtomicTasksOneTimeMapping[atomicTaskElemId]
            delete taskIDToAtomicTasksOneTimeMapping[atomicTaskElemId]
        }
        for (let i = 0; i < globalOneTimeTasksArr.length; i++) {
            if (globalOneTimeTasksArr[i].id === atomicTaskElemId) {
                const indexToSplice = i
                const removedTask = globalOneTimeTasksArr.splice(indexToSplice, 1)[0]
                renderOneTimeTasksList(globalOneTimeTasksArr)
                resetFocusArea()
                alert("Task has been marked as completed")
                const packagedData = {
                    "completed_task": {
                        "id": removedTask.id,
                        "name": removedTask.name
                    },
                    "atomic_tasks": atomicTasks
                }
                completedOneTimeTaskIdToJsonMapping[atomicTaskElemId] = packagedData
                break
            }
        }
    }

}

function generateId(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    return Array.from(array, byte => chars[byte % chars.length]).join('');
}

// Pseudocode
// > grab tasks from unordered list (id: focus-atomic-tasks)
// > convert list of buttons to list of text
// > Add to map (name: taskIDToAtomicTasksMapping)
function saveAtomicTasks() {
    const focusAtomicTasks = document.getElementById("focus-atomic-tasks")
    const children = focusAtomicTasks.children
    const textArr = []
    const atomicTaskElem = document.getElementById("atomic-task-id")
    const switcherTypeElem = document.getElementById("focus-type")
    const switcherType = switcherTypeElem.innerText
    for (let i = 0; i < children.length; i++) {
        textArr.push(children[i].innerText)
    }
    const taskID = atomicTaskElem.innerText
    if (taskID !== focusTypeHtmlConst) {
        if (switcherType === "repeatable") {
            taskIDToAtomicTasksMapping[taskID] = textArr
        } else if (switcherType == "one_time") {
            taskIDToAtomicTasksOneTimeMapping[taskID] = textArr
        }
    }
}

function addSingleTaskItem() {
    const singleTaskItemElem = document.getElementById("addToOneTimeTasks")
    const singleTaskItemText = singleTaskItemElem.value
    const genId = generateId()
    const newTask = {
        "name": singleTaskItemText,
        "id": genId
    }
    globalOneTimeTasksArr.push(newTask)
    renderOneTimeTasksList(globalOneTimeTasksArr)
}

async function dummyAsyncFunction(input = "hello") {
    // Simulate async work (network, timer, I/O, etc.)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const result = {
        ok: true,
        received: input,
        timestamp: new Date().toISOString(),
    };

    console.log("dummyAsyncFunction result:", result);
    return result;
}

async function asyncMutateSheetWrapper() {
    await mutateSheet(
        '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        'Sheet1!C20',
        'hello10'
    );
}

async function asyncGetDataForRow() {
    await rowLeftMost()
}

async function asyncGetDataForColumn() {
    await columnTopMost()
}

async function asyncAddToEndOfRow() {
    await addToEndOfRow()
}

async function asyncAddToEndOfColumn() {
    await addToEndOfColumn()
}

async function mutateSheet(sheetId, cellNumber, text) {
    const res = await fetch('http://localhost:3000/mutate-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sheet_id: sheetId,
            cell_number: cellNumber,
            text,
        }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    return data;
}

async function rowLeftMost() {
    const res = await fetch('http://localhost:3000/row-leftmost?sheet_id=1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc&row=1&sheet_name=Sheet1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function columnTopMost() {
    const res = await fetch('http://localhost:3000/column-topmost?sheet_id=1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc&column=A&sheet_name=Sheet1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function addToEndOfRow() {
    const res = await fetch('http://localhost:3000/add-to-end-of-row?sheet_id=1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc&row=1&text=hello&sheet_name=Sheet1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function addToEndOfColumn() {
    const res = await fetch('http://localhost:3000/add-to-end-of-column?sheet_id=1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc&column=A&text=hello&sheet_name=Sheet1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function addToDoListTask() {
    await addToEndOfColumn(getTodoListTask())
}

function getTodoListTask() {
    return "dummy"
}

async function addToEndOfColumn(text) {
    const params = new URLSearchParams({
        sheet_id: '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        column: 'A',
        text,
        sheet_name: 'Sheet1',
    });

    const res = await fetch(
        `http://localhost:3000/add-to-end-of-column?${params.toString()}`,
        { method: 'GET' }
    );

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function addToEndOfColumnSheet2(text, column_idx) {
    const params = new URLSearchParams({
        sheet_id: '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        column: column_idx,
        text,
        sheet_name: 'Sheet2',
    });

    const res = await fetch(
        `http://localhost:3000/add-to-end-of-column?${params.toString()}`,
        { method: 'GET' }
    );

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function getTodoListItems() {
    return await rowLeftMost(1)
}

async function rowLeftMost(row_num) {
    const params = new URLSearchParams({
        sheet_id: '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        row: row_num,
        sheet_name: 'Sheet1',
    });

    const res = await fetch(`http://localhost:3000/row-leftmost?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function getAtomicItemsForTodoListTask() {
    console.log("getAtomicItemsForTodoListTask")
    await columnTopMost("A")
}

async function columnTopMost(col_letter) {
    const params = new URLSearchParams({
        sheet_id: '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        column: col_letter,
        sheet_name: 'Sheet1',
    });

    const res = await fetch(`http://localhost:3000/column-topmost?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    return data;
}

async function markTodoListAsCompleted() {
    const data = await columnTopMost("A")
    const completedTasks = await rowLeftMostSheet2(1)
    const completedTasksData = completedTasks.data
    let colName = "A"
    if (completedTasksData.length > 0) {
        colName = completedTasksData[completedTasksData.length - 1][0][0]
    }
    const nextCol = nextColumn(colName)

    const dummyTodoListRes = await columnTopMost("A")
    const dummyTodoListResData = dummyTodoListRes.data

    // Delete A column from sheet 1
    await deleteColumnSheet1("A")

    for (let i = 0; i < dummyTodoListResData.length; i++) {
        await addToEndOfColumnSheet2(dummyTodoListResData[i][1], nextCol)
    }
}

function nextColumn(col) {
    col = String(col).trim().toUpperCase();
    let n = 0;
    for (const ch of col) {
        n = n * 26 + (ch.charCodeAt(0) - 64);
    }
    n += 1;

    let s = "";
    while (n > 0) {
        n--;
        s = String.fromCharCode(65 + (n % 26)) + s;
        n = Math.floor(n / 26);
    }
    return s;
}

async function rowLeftMostSheet2(row_num) {
    const params = new URLSearchParams({
        sheet_id: '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        row: row_num,
        sheet_name: 'Sheet2',
    });

    const res = await fetch(`http://localhost:3000/row-leftmost?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function deleteColumnSheet1(col_num) {
    const params = new URLSearchParams({
        sheet_id: '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
        column: col_num,
        sheet_name: 'Sheet1',
    });

    const res = await fetch(`http://localhost:3000/delete-column?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
    }
    console.log(data)
    return data;
}

async function addTasksToRightmostColumn({
    sheetId = '1pm6uH4SrOXdML5qp7iatDQBrDHXQltDOzKoB448Soyc',
    sheetName = 'Sheet2',
    tasks = ["test", "test2", "test3"],
} = {}) {
    const res = await fetch('http://localhost:3000/add-to-column-rightmost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sheet_id: sheetId,
            sheet_name: sheetName,
            tasks,
        }),
    });

    const data = await res.json();
    if (!res.ok || data.ok === false) {
        throw new Error(data.error || `Request failed (${res.status})`);
    }
    return data;
}

async function loadRefreshTodoListItems() {
    console.log("loadRefreshTodoListItems")
    const resGetTodoListItems = await getTodoListItems()
    console.log("resGetTodoListItems")
    console.log(resGetTodoListItems)

    //const dummyTasksArray = ["button1", "button2", "button3"]
    populateTodoListItemsSelect(resGetTodoListItems.data)
    loadRefreshTodoListItems = false
}

function populateTodoListItemsSelect(tasks) {
    // select id: todo_list_items
    taskNameToSheetsId = {}
    const selectElem = document.getElementById("todo_list_items")
    selectElem.innerHTML = ""
    for (let i = 0; i < tasks.length; i++) {
        const optionElem = document.createElement("option")
        optionElem.value = tasks[i][1]
        optionElem.innerText = tasks[i][1]
        selectElem.appendChild(optionElem)
        taskNameToSheetsId[tasks[i][1]] = tasks[i][0]
    }
}

async function logCurrentSelectValue() {
    const selectElem = document.getElementById("todo_list_items")
    console.log(selectElem.value)
}

async function loadAtomicTasksForCurrentTask() {
    const selectElem = document.getElementById("todo_list_items")
    const taskName = selectElem.value
    console.log("task: ", taskName)
    console.log("sheetsID: ", taskNameToSheetsId[taskName])
    console.log("column name", taskNameToSheetsId[taskName][0])
    const columnData = await columnTopMost(taskNameToSheetsId[taskName][0])
    console.log("atomic tasks raw data", columnData)

    const unorderedListAtomicTasks = document.getElementById("atomic_tasks")
    unorderedListAtomicTasks.innerHTML = ""

    const dataElems = columnData.data
    console.log("dataElems: ", dataElems)

    for (let i = 1; i < dataElems.length; i++) {
        console.log(dataElems[i])
        const liElem = document.createElement("li")
        liElem.innerHTML = dataElems[i][1]
        unorderedListAtomicTasks.appendChild(liElem)
    }
    loadedAtomicTasks = true
}

function onClickHandlerAddAtomicTasks() {
    console.log("onClickHandlerAddAtomicTasks")
    if (!loadedAtomicTasks) {
        alert("Please load atomic tasks for a task first")
    }
}