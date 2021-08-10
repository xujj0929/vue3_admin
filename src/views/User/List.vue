<template>
  <a-table
    size="middle"
    ref="tableRef"
    :columns="columns"
    :data-source="dataSource"
    :scroll="scroll"
    :pagination="pagination"
    :loading="loading"
    @change="onChange"
    bordered
  >
    <template #title>
      <a-form
        ref="formRef"
        :model="formState"
        layout="inline"
        @finish="onFinish"
      >
        <a-form-item name="user">
          <a-input v-model:value="formState.user" placeholder="查询姓名" />
        </a-form-item>
        <a-form-item name="code">
          <a-input v-model:value="formState.code" placeholder="查询工号" />
        </a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button @click="onReset">重置</a-button>
          <a-button type="primary" @click="onExport">导出</a-button>
        </a-space>
      </a-form>
    </template>
    <template #name="{ text, record }">
      {{ record.key }}&nbsp;<a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script>
import { defineComponent, ref, reactive, toRaw } from "vue";
import usePageTable from "@/hooks/usePageTable";

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

const getTableList = async (pag) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...pag,
        total: 400,
        list: [
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
            key: "33",
            name: "Joe Black",
            money: "￥120,000.00",
            address: "Sidney No. 1 Lake Park",
          },
        ],
      });
    }, 1000);
  });
};

export default defineComponent({
  setup() {
    const tableRef = ref();
    const formRef = ref();

    const formState = reactive({
      user: "",
      code: "",
    });

    const { scroll, loading, pagination, data, run } = usePageTable(
      getTableList,
      {
        ref: tableRef,
      }
    );

    const onFinish = () => {
      run({
        ...toRaw(formState),
        pageNo: 1,
      });
    };

    const onReset = () => {
      formRef.value.resetFields();
      onFinish();
    };

    const onChange = (pag) => {
      run({
        pageNo: pag.current,
        pageSize: pag.pageSize,
        ...toRaw(formState),
      });
    };

    const onExport = () => {
      console.info("list.onExport");
    };

    return {
      tableRef,
      formRef,

      formState,

      loading,
      scroll,
      pagination,

      dataSource: data,
      columns,
      onExport,
      onFinish,
      onReset,
      onChange,
    };
  },
});
</script>
<style lang="less" scoped></style>
