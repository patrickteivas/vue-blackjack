<template>
    <Layout>
        <Desk />
    </Layout>
</template>

<script>
import Layout from './components/Layout';
import Desk from "./components/Desk";

export default {
  name: 'App',

  components: {
    Desk,
    Layout,
  },

  data: () => ({
    //
  }),
};
</script>
