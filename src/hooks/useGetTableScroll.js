import { ref, onMounted } from "vue";

const defaultHeight = 295;

export default (formRef, excessHeight = 0) => {
  excessHeight = excessHeight + defaultHeight;
  const scroll = ref({});
  onMounted(() => {
    const height = excessHeight + formRef.value.$el.offsetHeight;
    scroll.value = {
      y: `calc(100vh - ${height}px)`,
    };
  });

  return {
    scroll,
  };
};
