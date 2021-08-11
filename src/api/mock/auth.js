export default {
  "post|/menu": ({ body }) => {
    return {
      code: 200,
      success: true,
      message: "",
      data: body,
    };
  },
};
