// @ts-ignore
import { createEffect, createMemo, splitProps, createSignal } from "solid-js";
import {
  Button,
  Select,
  SelectTrigger,
  SelectPlaceholder,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectListbox,
  SelectOption,
  SelectOptionText,
  SelectOptionIndicator,
} from "@hope-ui/solid";
import styles from "./index.module.less";
import { typeEnum } from "../../enums";

const selectList = [
  "Input",
  "Select",
  "DatePicker",
  "RangePicker",
  "Textarea",
  "StationSelect",
  "GroupFormItem",
  "StationSelectModal",
  "RadioGroup",
  "CheckboxGroup",
  "Checkbox",
  "Cascader",
  "Slider",
  "Switch",
  "Transfer",
];

interface ListProps {
  data?: any;
  onDelete?: Function;
  type?: typeEnum;
  selectValue?: string;
  selectOnchange?: Function;
}

export default function List({
  data,
  onDelete,
  type,
  selectValue,
  selectOnchange,
}: ListProps) {
  return (
    <div className={styles.list}>
      <div className={styles.listLeft}>
        <p className={styles.label}>{data?.label}</p>
        {type === typeEnum.form && (
          <div className={styles.select}>
            <Select value={selectValue} onChange={(e) => selectOnchange?.(e)}>
              <SelectTrigger>
                <SelectPlaceholder>请选择</SelectPlaceholder>
                <SelectValue />
                <SelectIcon />
              </SelectTrigger>
              <SelectContent>
                <SelectListbox>
                  {selectList?.map((item) => (
                    <SelectOption value={item}>
                      <SelectOptionText>{item}</SelectOptionText>
                      <SelectOptionIndicator />
                    </SelectOption>
                  ))}
                </SelectListbox>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <Button
        className={styles.btn}
        colorScheme="danger"
        onClick={() => onDelete?.(data)}
      >
        删除
      </Button>
    </div>
  );
}
