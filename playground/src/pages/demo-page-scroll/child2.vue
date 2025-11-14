

<template>
  <div class="content-section">
    <div class="start-marker">
      start2
    </div>
    <div
      id="end2"
      class="end-marker"
    >
      end2
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.content-section {
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0f0f0;
  border-radius: 6px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.start-marker, .end-marker {
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.start-marker {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}

.end-marker {
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
}

</style>
