let currentEditStudentId = null;

class Student {
  constructor(id, name, subject, average) {
    this.id = id;
    this.name = name;
    this.subject = subject;
    this.average = average;
  }

  avg() {
    let sum = 0;
    for (const sub of this.subject) {
      sum += Number(sub);
    }

    const avg = sum / this.subject.length;
    return parseInt(avg);
  }
}

const checkValidate = (name, maths, physical, chemistry) => {
  let err = "";

  let check = RegExp("^[a-zA-Z ]*$").test(name);

  if (
    name.trim().length == 0 ||
    !name ||
    name.length > 50 ||
    !isNaN(name) ||
    !check
  ) {
    err = "Name can't blank and have at least 50 characters \n";
    document.getElementById("name").setAttribute("class", "nameFocus");
  } else {
    document.getElementById("name").setAttribute("class", "");
  }
  if (maths < 0 || !maths) {
    err += "maths must be letter than 0 \n";
    document.getElementById("mathsPoint").setAttribute("class", "mathsFocus");
  } else {
    document.getElementById("mathsPoint").setAttribute("class", "");
  }
  if (physical < 0 || !physical) {
    err += "physical must be binger than 0 \n";
    document
      .getElementById("physicalPoint")
      .setAttribute("class", "physicalFocus");
  } else {
    document.getElementById("physicalPoint").setAttribute("class", "");
  }
  if (chemistry < 0 || !chemistry) {
    err += "chemistry must be binger than 0 \n";
    document
      .getElementById("chemistryPoint")
      .setAttribute("class", "chemistryFocus");
  } else {
    document.getElementById("chemistryPoint").setAttribute("class", "");
  }

  return err;
};

const getInformationOfStudent = (students) => {
  const name = document.getElementById("name").value;
  const maths = document.getElementById("mathsPoint").value;
  const physical = document.getElementById("physicalPoint").value;
  const chemistry = document.getElementById("chemistryPoint").value;

  const err = checkValidate(name, maths, physical, chemistry);

  if (!err) {
    const student = new Student(students.length, name, [
      maths,
      physical,
      chemistry,
    ]);
    students.push(student);

    return true;
  } else {
    console.log(err);

    document.getElementById("error").innerText = err;
    return false;
  }
};

let students = [];
const tableStudent = document.getElementById("tbSt");

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

    //show subject
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
      document.getElementById("submitForm").disabled = true;
      document.getElementById("showAVG").disabled = true;
      document.getElementById("showBest").disabled = true;
      document.getElementById("save").style.visibility = "unset";
      const studentId = btnEdit.value;
      const currentStudent = getStudentById(studentId);
      showToBrowser(students);

      document.getElementById("name").value = currentStudent.name;
      document.getElementById("mathsPoint").value = currentStudent.subject[0];
      document.getElementById("physicalPoint").value =
        currentStudent.subject[1];
      document.getElementById("chemistryPoint").value =
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
  document.getElementById("name").value = "";
  document.getElementById("mathsPoint").value = "";
  document.getElementById("physicalPoint").value = "";
  document.getElementById("chemistryPoint").value = "";
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
        .getElementById("trStudent" + student.id)
        .setAttribute("class", "bestStudent");
    }
  }
};

document.getElementById("save").addEventListener("click", (e) => {
  document.getElementById("submitForm").disabled = false;
  document.getElementById("showAVG").disabled = false;
  document.getElementById("showBest").disabled = false;
  for (const student of students) {
    if (student.id == currentEditStudentId) {
      const name = document.getElementById("name").value;
      const maths = document.getElementById("mathsPoint").value;
      const physical = document.getElementById("physicalPoint").value;
      const chemistry = document.getElementById("chemistryPoint").value;

      const err = checkValidate(name, maths, physical, chemistry);

      if (!err) {
        student.name = document.getElementById("name").value;
        student.subject = [maths, physical, chemistry];
        if (!isNaN(student.average)) {
          calculatorAVG(students);
        }

        showToBrowser(students);
        clearTextBox();

        document.getElementById("save").style.visibility = "hidden";

        document.getElementById("error").innerText = "";
      } else {
        document.getElementById("error").innerText = err;
      }
    }
  }
});

document.getElementById("submitForm").addEventListener("click", (e) => {
  document.getElementById("divShow").style.visibility = "unset";
  document.getElementById("showAVG").style.visibility = "unset";

  const check = getInformationOfStudent(students);
  showToBrowser(students);

  if (check) {
    document.getElementById("error").innerText = "";
    clearTextBox();
  }
});

document.getElementById("showAVG").addEventListener("click", (e) => {
  calculatorAVG(students);
  showToBrowser(students);
});

document.getElementById("showBest").addEventListener("click", (e) => {
  checkBest();
});
