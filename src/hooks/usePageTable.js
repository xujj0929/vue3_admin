import { onMounted, computed, ref, nextTick } from "vue";
import { useRequest } from "vue-request";

const defaultHeight = 270;

export default (service, options) => {
  const scroll = ref({});

  const pageNo = ref(options?.pageNo || 1);
  const pageSize = ref(options?.pageSize || 20);
  const total = ref(0);

  const { data, loading, run } = useRequest(service, {
    defaultParams: [
      {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      },
    ],
    formatResult: (res) => {
      if (!res) return [];
      pageNo.value = res.pageNo;
      total.value = res.total;
      pageSize.value = res.pageSize;
      return res.list;
    },
  });
  const pagination = computed(() => {
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      showTotal: (total) => `共 ${total} 条数据`,
      ...options?.pagination,
      total: total.value,
      current: pageNo.value,
      pageSize: pageSize.value,
    };
  });

  const loadData = (data) => {
    run({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      ...data,
    });
  };

  onMounted(() => {
    if (!options?.ref) return;
    const $el = options.ref.value.$el;
    const $title = $el.getElementsByClassName("ant-table-title");
    let excessHeight = (options?.excessHeight || 0) + defaultHeight;
    if ($title.length) excessHeight += $title[0].offsetHeight;
    const $body = $el.getElementsByClassName("ant-table-body");
    const height = `calc(100vh - ${excessHeight}px)`;
    if ($body.length) {
      nextTick(() => {
        $body[0].style.height = height;
      });
    }

    scroll.value = { y: height };
  });

  return {
    loading,
    scroll,
    data,
    pagination,
    run: loadData,
  };
};
