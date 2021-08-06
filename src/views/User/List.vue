<template>
  <a-table
    size="middle"
    :columns="columns"
    :data-source="dataSource.list"
    :scroll="scroll"
    :pagination="pagination"
    :loading="loading"
    @change="onChange"
    bordered
  >
    <template #title>
      <a-form
        ref="formRef"
        layout="inline"
        :model="formState"
        @finish="onFinish"
      >
        <a-form-item>
          <a-input
            name="formStateUser"
            v-model:value="formState.user"
            placeholder="查询姓名"
          >
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            name="formStateCode"
            v-model:value="formState.code"
            placeholder="查询工号"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit"> 查询 </a-button>
        </a-form-item>
      </a-form>
    </template>
    <template #name="{ text, record }">
      {{ record.key }}&nbsp;<a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script>
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  toRaw,
  computed,
} from "vue";
import useGetTableScroll from "@/hooks/useGetTableScroll";

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
    const formRef = ref();
    const loading = ref(true);
    const dataSource = ref({
      current: 1,
      total: 400,
      list: [],
    });
    const formState = reactive({
      user: "",
      code: "",
    });
    const pagination = computed(() => {
      return {
        current: dataSource.value.current,
        pageSize: 20,
        total: dataSource.value.total,
      };
    });
    const onFinish = () => {
      console.log(toRaw(formState));
    };
    const onChange = (pag) => {
      console.info(pag);
    };
    const { scroll } = useGetTableScroll(formRef);

    onMounted(() => {
      setTimeout(() => {
        dataSource.value = {
          current: 1,
          total: 400,
          list: data,
        };
        loading.value = false;
      }, 1000);
    });
    return {
      scroll,
      loading,
      formRef,
      formState,
      columns,
      dataSource,
      pagination,
      onFinish,
      onChange,
    };
  },
});
</script>
<style lang="less" scoped></style>
