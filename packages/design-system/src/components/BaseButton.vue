<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "danger" | "glass";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: any; // Lucide icon component
  iconPosition?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  iconPosition: "left",
});

const buttonClass = computed(() => {
  const baseClasses =
    "group inline-flex items-center justify-center font-sans font-semibold rounded-[8px] cursor-pointer transition-colors duration-150 ease-in-out relative overflow-hidden no-underline whitespace-nowrap select-none";

  const sizeClasses = {
    sm: "px-[18px] py-[9px] text-[13px] gap-2",
    md: "px-7 py-[13px] text-[15px] gap-[10px]",
    lg: "px-8 py-4 text-base gap-3",
  }[props.size];

  const variantClasses = {
    primary: "bg-primary text-white border border-primary hover:enabled:bg-primary-hover",
    secondary:
      "bg-transparent text-text-primary border border-border-color hover:enabled:border-text-primary",
    glass:
      "bg-glass-bg border border-glass-border backdrop-blur-md text-text-primary hover:enabled:border-primary",
    danger: "bg-[#dc2626] text-white border border-[#dc2626] hover:enabled:bg-[#b91c1c]",
  }[props.variant];

  const stateClasses =
    props.disabled || props.loading ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  return [baseClasses, sizeClasses, variantClasses, stateClasses];
});
</script>

<template>
  <button :class="buttonClass" :disabled="disabled || loading">
    <!-- Loading spinner -->
    <span
      v-if="loading"
      class="w-[1.25em] h-[1.25em] border-2 border-current border-b-transparent rounded-full inline-block box-border animate-spin"
    ></span>

    <!-- Left Icon -->
    <component
      :is="icon"
      v-if="icon && iconPosition === 'left' && !loading"
      class="w-[1.25em] h-[1.25em] stroke-[2px] transition-all duration-200 ease-in-out group-hover:enabled:-translate-x-[2px]"
    />

    <!-- Slot Content -->
    <span class="btn-text">
      <slot></slot>
    </span>

    <!-- Right Icon -->
    <component
      :is="icon"
      v-if="icon && iconPosition === 'right' && !loading"
      class="w-[1.25em] h-[1.25em] stroke-[2px] transition-all duration-200 ease-in-out group-hover:enabled:translate-x-[2px]"
    />
  </button>
</template>
