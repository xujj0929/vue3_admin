<template>
  <PageTable :formModel="formState" :columns="columns" :data-source="loadData">
    <template #form>
      <a-form-item name="user">
        <a-input v-model:value="formState.user" placeholder="查询姓名">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="code">
        <a-input v-model:value="formState.code" placeholder="查询工号">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
    </template>
    <template #button>
      <a-button type="primary" @click="onExport"> 导出 </a-button>
    </template>
    <template #name="{ text, record }">
      {{ record.key }}&nbsp;<a>{{ text }}</a>
    </template>
  </PageTable>
</template>
<script>
import { defineComponent, reactive, toRaw } from "vue";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    slots: {
      customRender: "name",
    },
  },
  {
    title: "Cash Assets",
    dataIndex: "money",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park",
  },
];
export default defineComponent({
  setup() {
    const formState = reactive({
      user: "",
      code: "",
    });

    const loadData = async (pag) => {
      console.info("loadData", pag, toRaw(formState));
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            pageNo: 1,
            pageSize: 20,
            total: 400,
            list: data,
          });
        }, 1000);
      });
    };

    const onExport = () => {
      console.info("list.onExport");
    };

    return {
      formState,
      columns,
      loadData,
      onExport,
    };
  },
});
</script>
<style lang="less" scoped></style>
