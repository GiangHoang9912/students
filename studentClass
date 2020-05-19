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

export default Student;
