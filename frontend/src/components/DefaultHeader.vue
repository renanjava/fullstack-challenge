<template>
  <div class="layout-container">
    <aside class="sidebar-wrapper">
      <SideBar />
    </aside>

    <div class="content-wrapper">
      <header class="page-header">
        <div class="header-gradient"></div>
        <div class="header-content">
          <h1 class="page-title">{{ primaryText }}</h1>
          <p class="page-subtitle">{{ secondaryText }}</p>
        </div>
      </header>

      <div class="page-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './SideBar.vue'

export default defineComponent({
  name: 'DefaultHeader',
  components: {
    SideBar,
  },
  props: {
    primaryText: { type: String, required: true },
    secondaryText: { type: String, required: true },
  },
})
</script>

<style scoped>
* {
  color-scheme: light !important;
}

.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa !important;
}

.sidebar-wrapper {
  width: 280px;
  min-width: 280px;
  background-color: #ffffff !important;
  border-right: 1px solid #e9ecef;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa !important;
  overflow-x: hidden;
}

.page-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  overflow: hidden;
}

.header-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.header-content {
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff !important;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 400;
  margin: 0;
}

.page-content {
  flex: 1;
  padding: 2rem 2.5rem;
  background-color: #f8f9fa !important;
}

@media screen and (max-width: 1024px) {
  .sidebar-wrapper {
    width: 240px;
    min-width: 240px;
  }

  .page-header {
    padding: 2rem 1.5rem 1.5rem 1.5rem;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .page-content {
    padding: 1.5rem;
  }
}

@media screen and (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .sidebar-wrapper {
    width: 100%;
    min-width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #e9ecef;
  }

  .page-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .page-content {
    padding: 1rem;
  }
}

.sidebar-wrapper::-webkit-scrollbar {
  width: 6px;
}

.sidebar-wrapper::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.sidebar-wrapper::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 3px;
}

.sidebar-wrapper::-webkit-scrollbar-thumb:hover {
  background: #adb5bd;
}
</style>
