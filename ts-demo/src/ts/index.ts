import * as echarts from "echarts";
const ec = echarts as any;
let myChart = ec.init(document.getElementById("lineChart"));
interface LabelledValue {
  label: string;
  color?: string;
  width?: number;
}

let key: number = 20;
let list = [];
for (let i = 0; i < key; i++) {
  let w: LabelledValue = {
    label: "1" + i,
    width: i * 2
  };
  list.push(w);
}

interface Foo {
  type: "foo";
}

interface Bar {
  type: "bar";
}

type All = Foo | Bar;
function handleValue(val: All) {
  switch (val.type) {
    case "foo":
      // 这里 val 被收窄为 Foo
      break;
    case "bar":
      // val 在这里是 Bar
      break;
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val;
      break;
  }
}
