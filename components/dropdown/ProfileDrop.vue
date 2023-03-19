<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
      Click me <a-icon type="down" />
    </a>
    <a-menu slot="overlay">
      <a-menu-item key="0">
        <a href="#">1st menu item</a>
      </a-menu-item>
      <a-menu-item key="1">
        <a href="#">2nd menu item</a>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="3">
        3rd menu item
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>
