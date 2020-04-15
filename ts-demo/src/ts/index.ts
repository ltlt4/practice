// import * as echarts from 'echarts';
// const ec = echarts as any;
// let myChart = ec.init(document.getElementById('lineChart'));
const student = {
  name: 'jsPool',
  age: 20,
  scores: {
    math: 95,
    chinese: 98,
    english: 93
  }
};
function showScore(student) {
  const {
    name,
    scores: { math = 0, chinese = 0, english = 0 }
  } = student;
  console.log('学生名:' + name);
  console.log('数学成绩:' + math);
  console.log('语文成绩:' + chinese);
  console.log('英语成绩:' + english);
}
showScore(student);
