let currentEditStudentId = null;

import Student from "./studentClass.js";

const checkValidate = (name, maths, physical, chemistry) => {
  let err = "";

  const check = RegExp("^[a-zA-Z ]*$").test(name);

  if (name.trim().length == 0 || !name || name.length > 50 || !check) {
    err = "Name can't blank and have at least 50 characters \n";
    document.querySelector("#name").setAttribute("class", "nameFocus");
  } else {
    document.querySelector("#name").setAttribute("class", "");
  }
  if (maths < 0 || !maths) {
    err += "maths must be letter than 0 \n";
    document.querySelector("#mathsScore").setAttribute("class", "mathsFocus");
  } else {
    document.querySelector("#mathsScore").setAttribute("class", "");
  }
  if (physical < 0 || !physical) {
    err += "physical must be binger than 0 \n";
    document
      .querySelector("#physicalScore")
      .setAttribute("class", "physicalFocus");
  } else {
    document.querySelector("#physicalScore").setAttribute("class", "");
  }
  if (chemistry < 0 || !chemistry) {
    err += "chemistry must be binger than 0 \n";
    document
      .querySelector("#chemistryScore")
      .setAttribute("class", "chemistryFocus");
  } else {
    document.querySelector("#chemistryScore").setAttribute("class", "");
  }

  return err;
};

const getInformationOfStudent = (students) => {
  const name = document.querySelector("#name").value;
  const maths = document.querySelector("#mathsScore").value;
  const physical = document.querySelector("#physicalScore").value;
  const chemistry = document.querySelector("#chemistryScore").value;
  const err = checkValidate(name, maths, physical, chemistry);
  const subject = [maths, physical, chemistry];
  if (!err) {
    const student = new Student(students.length, name, subject);
    students.push(student);
    return true;
  } else {
    console.log(err);
    document.querySelector("#error").innerText = err;
    return false;
  }
};

let students = [];
const tableStudent = document.querySelector("#tbSt");

const showToBrowser = (students) => {
  tableStudent.innerHTML = "";
  const trHead = document.createElement("tr");
  tableStudent.appendChild(trHead);
  createTdOfTableStudent(trHead, "Name");
  createTdOfTableStudent(trHead, "Maths");
  createTdOfTableStudent(trHead, "Physical");
  createTdOfTableStudent(trHead, "Chemistry");
  createTdOfTableStudent(trHead, "Avg");
  createTdOfTableStudent(trHead, "Edit");
  students.forEach((element) => {
    const tr = document.createElement("tr");
    tr.setAttribute("id", "trStudent" + element.id);
    tableStudent.appendChild(tr);
    createTdOfTableStudent(tr, element.name);
    for (const sub of element.subject) {
      createTdOfTableStudent(tr, sub);
    }
    if (isNaN(element.average)) {
      element.average = "?";
    }
    createTdOfTableStudent(tr, element.average);
    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("value", element.id);
    btnEdit.appendChild(document.createTextNode("Edit"));
    tr.appendChild(btnEdit);
    btnEdit.addEventListener("click", (e) => {
      document.querySelector("#submitForm").disabled = true;
      document.querySelector("#showAVG").disabled = true;
      document.querySelector("#showBest").disabled = true;
      document.querySelector("#save").style.visibility = "unset";
      const studentId = btnEdit.value;
      const currentStudent = getStudentById(studentId);
      showToBrowser(students);
      document.querySelector("#name").value = currentStudent.name;
      document.querySelector("#mathsScore").value = currentStudent.subject[0];
      document.querySelector("#physicalScore").value =
        currentStudent.subject[1];
      document.querySelector("#chemistryScore").value =
        currentStudent.subject[2];
      currentEditStudentId = currentStudent.id;
    });
  });
};

const getStudentById = (studentId) => {
  for (const student of students) {
    if (student.id == studentId) {
      return student;
    }
  }
};

const createTdOfTableStudent = (tr, text) => {
  const td = document.createElement("td");
  const txt = document.createTextNode(text);
  td.appendChild(txt);
  tr.appendChild(td);
};

const clearTextBox = () => {
  document.querySelector("#name").value = "";
  document.querySelector("#mathsScore").value = "";
  document.querySelector("#physicalScore").value = "";
  document.querySelector("#chemistryScore").value = "";
};

const calculatorAVG = (students) => {
  for (const student of students) {
    student.average = student.avg();
  }
};

const checkBest = () => {
  for (const student of students) {
    if (student.average >= 8) {
      document
        .querySelector("#trStudent" + student.id)
        .setAttribute("class", "bestStudent");
    }
  }
};

document.querySelector("#save").addEventListener("click", (e) => {
  e.preventDefault();
  for (const student of students) {
    if (student.id == currentEditStudentId) {
      const name = document.querySelector("#name").value;
      const maths = document.querySelector("#mathsScore").value;
      const physical = document.querySelector("#physicalScore").value;
      const chemistry = document.querySelector("#chemistryScore").value;
      const err = checkValidate(name, maths, physical, chemistry);
      if (!err) {
        student.name = document.querySelector("#name").value;
        student.subject = [maths, physical, chemistry];
        if (!isNaN(student.average)) {
          calculatorAVG(students);
        }
        showToBrowser(students);
        clearTextBox();
        document.querySelector("#submitForm").disabled = false;
        document.querySelector("#showAVG").disabled = false;
        document.querySelector("#showBest").disabled = false;
        document.querySelector("#save").style.visibility = "hidden";
        document.querySelector("#error").innerText = "";
      } else {
        document.querySelector("#error").innerText = err;
      }
    }
  }
});

document.querySelector("#submitForm").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#divShow").style.visibility = "unset";
  document.querySelector("#showAVG").style.visibility = "unset";
  const check = getInformationOfStudent(students);
  showToBrowser(students);
  if (check) {
    document.querySelector("#error").innerText = "";
    clearTextBox();
  }
});

document.querySelector("#showAVG").addEventListener("click", (e) => {
  e.preventDefault();
  calculatorAVG(students);
  showToBrowser(students);
});

document.querySelector("#showBest").addEventListener("click", (e) => {
  e.preventDefault();
  checkBest();
});
