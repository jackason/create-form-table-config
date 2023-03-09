// @ts-ignore
import { createEffect, createSignal, createMemo } from "solid-js";
import { RadioGroup, HStack, Radio, Button } from "@hope-ui/solid";
import { List } from "./components";
import { transformTextMapToOpts } from "./config";
import { TYPE_ENUM_MAP } from "./constants";
import { typeEnum } from "./enums";
import styles from "./index.module.less";

export default function Index() {
  const [visible, setVisible] = createSignal<boolean>(false);
  const [radioValue, setRadioValue] = createSignal<string>("form");
  const [list, setList] = createSignal<Array<any>>([]);

  // 处理单个节点点击
  const nodeHandle = (el) => {
    let newList = list();
    newList.push({
      name: "",
      component: "",
      label: el.innerText,
      props: { placeholder: "" },
    });
    setList([...newList]);
  };

  // 点击所有的节点
  const clickAllDom = () => {
    const allDom = document.body.querySelectorAll("#app *");

    allDom.forEach((el: any) => {
      el.addEventListener("click", (e) => {
        // 每个节点
        const node = el.childNodes?.[0];
        // 判断节点要为文本节点
        if (!el.className.includes("mocker_") && node.nodeType === 3) {
          nodeHandle(el);
        }
        e.stopPropagation();
        el.removeEventListener("click", () => {});
      });
    });
  };

  // 删除
  const onDelete = (index) => {
    let newList = list()?.filter((c, i) => i !== index);
    setList([...newList]);
    // clickAllDom();
  };

  const copy = (text) => {
    // 创建input元素
    const el = document.createElement("input");
    // 给input元素赋值需要复制的文本
    el.setAttribute("value", text);
    // 将input元素插入页面
    document.body.appendChild(el);
    // 选中input元素的文本
    el.select();
    // 复制内容到剪贴板
    document.execCommand("copy");
    // 删除input元素
    document.body.removeChild(el);
    alert("复制成功");
  };

  // 创建
  const createCode = () => {
    let newList = list();
    // table需要重新设置数据
    if (radioValue() === typeEnum.table) {
      newList = newList?.map((item) => ({
        title: item.label,
        dataIndex: "a",
        align: "center",
      }));
    }
    copy(JSON.stringify(newList));
  };

  // 重置
  const reset = () => {
    setList([]);
    setRadioValue("form");
  };

  // 开始
  const onStart = () => {
    setVisible(true);
    clickAllDom();
  };

  // 在数据变更后重新执行整个函数体
  const listDom = createMemo(() => {
    const configType = radioValue();

    return list()?.map((item, index) => (
      <List
        selectValue={item.component}
        selectOnchange={(e) => {
          let newList = list();
          newList[index].component = e;
          setList([...newList]);
        }}
        key={index}
        data={item}
        onDelete={() => onDelete(index)}
        type={configType}
      />
    ));
  }, [list, radioValue]);

  return (
    <div className={styles.warp}>
      {visible() ? (
        <div className={styles.box}>
          <p className={styles.title}>生成模板</p>
          <RadioGroup
            value={radioValue()}
            onChange={(e) => setRadioValue(e)}
            className={styles.titleContent}
          >
            <HStack spacing="$6">
              {transformTextMapToOpts(TYPE_ENUM_MAP)?.map((c) => (
                <Radio key={c.value} value={c.value}>
                  {c.label}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
          <p className={styles.title}>模板内容</p>
          <div className={styles.titleContent}>
            <p className={styles.placeholder}>请点击页面选择</p>
            <div className={styles.content}>{listDom}</div>
          </div>
          <div className={styles.buttons}>
            <Button onClick={createCode}>生成代码</Button>
            <Button variant="outline" onClick={reset}>
              清空内容
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.start} onClick={onStart}>
          <Button>点击分析原型</Button>
        </div>
      )}
    </div>
  );
}
