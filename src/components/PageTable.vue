<template>
  <a-table
    size="middle"
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="list"
    :scroll="scroll"
    :pagination="defaultPagination"
    :loading="loading"
    @change="onChange"
    bordered
  >
    <template v-if="formModel" #title>
      <a-form
        ref="formRef"
        :model="formModel"
        layout="inline"
        @finish="onFinish"
      >
        <slot name="form" />
        <a-form-item class="button-list">
          <a-button type="primary" html-type="submit"> 查询 </a-button>
          <a-button @click="onReset">重置</a-button>
          <slot name="button" />
        </a-form-item>
      </a-form>
    </template>
    <slot />
  </a-table>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { usePagination } from "vue-request";
import useGetTableScroll from "@/hooks/useGetTableScroll";

export default defineComponent({
  props: {
    rowSelection: Object,
    formModel: Object,
    columns: Array,
    dataSource: Function,
    pagination: Object,
  },
  setup(props, context) {
    const formRef = ref();
    const { scroll } = useGetTableScroll(formRef);

    const total = ref(0);
    const {
      data: list,
      run,
      loading,
      current,
    } = usePagination(props.dataSource, {
      manual: true,
      formatResult: (res) => {
        total.value = res.total;
        return res.list;
      },
      pagination: {
        currentKey: "pageNo",
        pageSizeKey: "pageSize",
      },
    });

    const pageSize = ref(props.pagination?.pageSize || 20);
    const defaultPagination = computed(() => ({
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      showTotal: (total) => `共 ${total} 条数据`,
      ...props.pagination,
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const onFinish = () => {
      run({
        current: props.pagination?.pageNo || 1,
        pageSize: pageSize.value,
      });
      context.emit("finish");
    };
    const onReset = () => {
      formRef.value.resetFields();
      context.emit("reset");
    };

    const onChange = (pag) => {
      pageSize.value = pag.pageSize;
      run({
        current: pag.current,
        pageSize: pag.pageSize,
      });
    };

    onMounted(() => {
      onFinish();
    });
    return {
      formRef,
      scroll,

      loading,
      list,
      defaultPagination,

      onFinish,
      onReset,
      onChange,
    };
  },
});
</script>
<style lang="less" scoped>
.button-list {
  :deep(.ant-form-item-control-input-content * + *) {
    margin-left: 5px;
  }
}
</style>
