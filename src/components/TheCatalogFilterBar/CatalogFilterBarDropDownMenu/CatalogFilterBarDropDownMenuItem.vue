<template>
  <div>
    <li class="my-4">
      <label class="custom-label flex">
        <div>
          <slot name="option-checkbox"> Checkbox </slot>
        </div>
        <span class="font-semibold select-none">
          <slot name="option-label"> Label </slot>
        </span>
      </label>
    </li>
  </div>
</template>

<script>
export default {
  name: "CatalogFilterBarDropDownMenuItem"
};
</script>
