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