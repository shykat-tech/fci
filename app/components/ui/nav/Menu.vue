<script setup lang="ts">
const emit = defineEmits<{
  close: [];
}>();

const closeMenu = () => {
  emit("close");
};

const menuList = [
  {
    label: "Home",
    slug: "/",
    children: null,
  },
  {
    label: "What We Do",
    slug: "/what-we-do",
    children: null,
  },
  {
    label: "Collections",
    slug: "/collections",
    children: [
      {
        label: "FCI BD",
        slug: "/fci-bd",
      },
      {
        label: "Alliance",
        slug: "/alliance",
      },
    ],
  },
  {
    label: "Life at FCI",
    slug: "/life-at-fci",
    children: [
      {
        label: "FCI BD",
        slug: "/fci-bd",
      },
    ],
  },
];

type MainListType = {
  label: string;
  slug: string;
  children:
    | null
    | {
        label: string;
        slug: string;
      }[];
};

const activeLink = ref<MainListType | null>(null);
</script>

<template>
  <div class="menu">
    <div class="overlay" @click="closeMenu" />
    <div class="close-area">
      <button
        class="label"
        :style="!activeLink?.children && { opacity: 0 }"
        @click="activeLink = null"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4L6 10L12 16" stroke="black" stroke-width="1.5" />
        </svg>

        <span>{{ activeLink?.children && activeLink.label }}</span>
      </button>
      <div class="icon" @click="closeMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 4L20 20"
            stroke="#04312A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 4L4 19.9999"
            stroke="#04312A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="cols">
      <div class="main-col">
        <ul
          class="links"
          :class="activeLink && activeLink?.children && 'shift-right'"
        >
          <NuxtLink
            :to="link.children ? undefined : link.slug"
            v-for="link in menuList"
            @click="link.children === null && closeMenu"
            class="fLink"
            :class="{
              hasLink: link.children,
              active: link.children && link.slug === activeLink?.slug,
            }"
            @mouseenter="activeLink = link"
          >
            {{ link.label }}

            <svg
              v-if="link.children"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M2 7L10 15L18 7" stroke="black" stroke-width="1.5" />
              <path d="M4 5L10 11L16 5" stroke="black" stroke-width="1.5" />
            </svg>
          </NuxtLink>
        </ul>

        <div class="social">
          <NuxtLink to="#"
            ><svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99219 0C11.4423 0 11.7426 -5.72981e-05 12.709 0.0224609C13.6532 0.0750266 14.3133 0.224914 14.8828 0.450195C15.4748 0.675474 15.9615 0.976685 16.4785 1.4873C16.973 1.9904 17.3035 2.47839 17.5283 3.0791C17.7531 3.65724 17.9023 4.31836 17.9473 5.25684C17.9997 6.21783 18 6.52586 18 8.97363C18 11.4216 17.9922 11.7221 17.9473 12.6982C17.9098 13.6444 17.76 14.3053 17.5352 14.876C17.3029 15.4692 16.9959 15.9728 16.5088 16.4834C16.0068 16.9789 15.5116 17.2943 14.9121 17.5195C14.3427 17.7447 13.6832 17.8944 12.7393 17.9395C11.7801 17.9995 11.4653 18 9.02246 18C6.57957 18 6.2798 17.992 5.30566 17.9395C4.36168 17.8944 3.70224 17.7447 3.13281 17.5195C2.54081 17.2867 2.03042 16.9783 1.50586 16.5127C1.01151 16.0097 0.69643 15.5068 0.47168 14.9062C0.246887 14.3431 0.0977025 13.6821 0.0527344 12.7285C0.000281346 11.7674 2.02208e-10 11.4519 0 9.01172C0 6.57117 -0.000379726 6.27017 0.0595703 5.29395C0.104542 4.34784 0.254692 3.68689 0.479492 3.11621C0.711793 2.52302 1.01946 2.02757 1.49902 1.50195C2.00107 1.0139 2.51089 0.697923 3.11035 0.472656C3.67227 0.247493 4.3318 0.0977765 5.2832 0.0527344C6.24229 0.000176236 6.5496 0 8.99219 0ZM8.99121 1.61719C6.59321 1.61719 6.30815 1.62517 5.35645 1.67773C4.47987 1.71529 4.00776 1.8574 3.68555 1.97754C3.25852 2.1427 2.95885 2.33808 2.65918 2.65332C2.33702 2.96864 2.13424 3.26908 1.98438 3.68945C1.85699 4.01234 1.71489 4.48574 1.66992 5.36426C1.61747 6.31795 1.61719 6.60383 1.61719 9.00684C1.61719 11.4094 1.62431 11.6948 1.67676 12.6484C1.71423 13.527 1.85666 14.0003 1.97656 14.3232C2.1414 14.7512 2.33671 15.0512 2.65137 15.3516C2.96609 15.6745 3.26592 15.8772 3.68555 16.0273C4.00776 16.155 4.47977 16.2977 5.35645 16.3428C6.30815 16.3953 6.59321 16.3955 8.99121 16.3955C11.3891 16.3955 11.6743 16.3885 12.626 16.3359C13.5025 16.2984 13.9747 16.1553 14.2969 16.0352C14.7239 15.87 15.0236 15.6747 15.3232 15.3594C15.6455 15.044 15.8482 14.7437 15.998 14.3232C16.1254 14.0003 16.2675 13.527 16.3125 12.6484C16.365 11.6948 16.3652 11.4094 16.3652 9.00684C16.3652 6.60383 16.3571 6.31795 16.3047 5.36426C16.2672 4.48574 16.1248 4.01234 16.0049 3.68945C15.8401 3.26173 15.6456 2.96135 15.3311 2.66113C15.0164 2.3383 14.7164 2.13553 14.2969 1.98535C13.9747 1.85771 13.5024 1.71501 12.626 1.66992C11.6743 1.61736 11.3891 1.61719 8.99121 1.61719ZM8.99121 4.38672C11.5391 4.38675 13.6074 6.45952 13.6074 9.0127C13.6073 11.5658 11.539 13.6386 8.99121 13.6387C6.4434 13.6387 4.3751 11.5658 4.375 9.0127C4.375 6.4595 6.44333 4.38672 8.99121 4.38672ZM8.98926 6.01172C7.34083 6.01195 5.99219 7.3637 5.99219 9.01562C5.99227 10.6675 7.34088 12.0193 8.98926 12.0195C10.6378 12.0195 11.9872 10.6676 11.9873 9.01562C11.9873 7.36356 10.6379 6.01172 8.98926 6.01172ZM13.8213 3.08594C14.4207 3.08594 14.908 3.57388 14.9082 4.16699L14.8701 4.20508C14.87 4.80571 14.3829 5.27832 13.791 5.27832C13.1917 5.27816 12.7422 4.79792 12.7422 4.19727C12.7422 3.59654 13.2218 3.08594 13.8213 3.08594Z"
                fill="white"
              />
            </svg>
          </NuxtLink>
          <NuxtLink to="#"
            ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.69567 13.2478C9.62367 13.2478 8.03967 13.2478 7.31967 13.2478C6.93567 13.2478 6.81567 13.1038 6.81567 12.7438C6.81567 11.7838 6.81567 10.7998 6.81567 9.83983C6.81567 9.45583 6.95967 9.33583 7.31967 9.33583H9.69567C9.69567 9.26383 9.69567 7.87183 9.69567 7.22383C9.69567 6.26383 9.86367 5.35183 10.3437 4.51183C10.8477 3.64783 11.5677 3.07183 12.4797 2.73583C13.0797 2.51983 13.6797 2.42383 14.3277 2.42383H16.6797C17.0157 2.42383 17.1597 2.56783 17.1597 2.90383V5.63983C17.1597 5.97583 17.0157 6.11983 16.6797 6.11983C16.0317 6.11983 15.3837 6.11983 14.7357 6.14383C14.0877 6.14383 13.7517 6.45583 13.7517 7.12783C13.7277 7.84783 13.7517 8.54383 13.7517 9.28783H16.5357C16.9197 9.28783 17.0637 9.43183 17.0637 9.81583V12.7198C17.0637 13.1038 16.9437 13.2238 16.5357 13.2238C15.6717 13.2238 13.8237 13.2238 13.7517 13.2238V21.0478C13.7517 21.4558 13.6317 21.5998 13.1997 21.5998C12.1917 21.5998 11.2077 21.5998 10.1997 21.5998C9.83967 21.5998 9.69567 21.4558 9.69567 21.0958C9.69567 18.5758 9.69567 13.3198 9.69567 13.2478Z"
                fill="white"
              />
            </svg>
          </NuxtLink>
          <NuxtLink to="#"
            ><svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5999 21.6007V14.5687C21.5999 11.1127 20.8559 8.47266 16.8239 8.47266C14.8799 8.47266 13.5839 9.52866 13.0559 10.5367H13.0079V8.78466H9.19189V21.6007H13.1759V15.2407C13.1759 13.5607 13.4879 11.9527 15.5519 11.9527C17.5919 11.9527 17.6159 13.8487 17.6159 15.3367V21.5767H21.5999V21.6007Z"
                fill="white"
              />
              <path
                d="M2.71167 8.78516H6.69567V21.6012H2.71167V8.78516Z"
                fill="white"
              />
              <path
                d="M4.7039 2.40039C3.4319 2.40039 2.3999 3.43239 2.3999 4.70439C2.3999 5.97639 3.4319 7.03239 4.7039 7.03239C5.9759 7.03239 7.0079 5.97639 7.0079 4.70439C7.0079 3.43239 5.9759 2.40039 4.7039 2.40039Z"
                fill="white"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
      <Transition name="menu">
        <ul class="sub-col" v-if="activeLink?.children">
          <NuxtLink
            :to="cLink.label"
            @click="closeMenu"
            v-for="cLink in activeLink.children"
            class="sLink"
          >
            {{ cLink.label }}
          </NuxtLink>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: 100%;
  background: $white;
  padding-inline: 1.25rem;
  @include flex(start, start, column);

  .overlay {
    display: none;
  }

  .close-area {
    width: 100%;
    cursor: pointer;
    @include flex(space-between, center);
    padding-top: 2.25rem;

    .label {
      @include flex(center, center);
      gap: 0.25rem;
      background: none;
      outline: none;
      border: none;

      span {
        color: $black;
        font-size: 1rem;
        font-style: normal;
        font-weight: 550;
        line-height: 120%; /* 1.2rem */
        letter-spacing: -0.02rem;
        opacity: 0.8;
      }
    }
  }

  .cols {
    width: 100%;
    height: 100%;
    margin-top: 0.5rem;
    overflow: hidden;
    position: relative;

    .main-col {
      background: $white;
      height: 100%;
      @include flex(space-between, start, column);
      @include clamp-property("padding-bottom", 3.5, 3);

      .links {
        width: 100%;
        transition: all 0.45s ease;

        & > * + * {
          margin-top: 1.5rem;
        }

        &.shift-right {
          margin-left: 100%;
        }
      }

      .social {
        @include flex();
        gap: 0.75rem;

        a {
          border-radius: 50%;
          background-color: $base;
          color: $white;
          text-decoration: none;

          @include clamp-property("width", 3, 3);
          @include clamp-property("height", 3, 3);
          @include flex(center, center);
        }
      }
    }

    .sub-col {
      background-color: $white;
      position: absolute;
      top: 0.5rem;
      left: 0;
      width: 100%;
      height: 100%;

      & > * + * {
        margin-top: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    background: transparent;
    padding-inline: 0;
    flex-direction: row;
    position: relative;

    .overlay {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(0, 0, 0, 0.1);
      // backdrop-filter: blur(10px);
      top: 0;
      left: 0;
      // z-index: 1;
    }

    .close-area {
      width: fit-content;
      height: 100%;
      background: $white;
      padding-block: 1.5rem;
      border-right: 1px solid rgba(4, 49, 42, 0.1);
      position: relative;

      .label {
        display: none;
      }

      .icon {
        width: 100%;
        height: 100%;
        background: transparent;
        @include flex(center, center);
        @include clamp-property("padding-inline", 1.25, 1.5);
      }
    }

    .cols {
      width: fit-content;
      @include flex();
      background: transparent;
      margin-top: 0rem;

      .main-col {
        width: 27.5rem;
        position: relative;
        padding-top: 7.5rem;
        padding-inline-start: 3.69rem;
        padding-inline-end: 3rem;

        .links {
          &.shift-right {
            margin-left: 0;
          }
        }

        &::after {
          content: "";
          position: absolute;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            #04312a00 0%,
            #04312a 50%,
            #04312a00 100%
          );
          opacity: 0.25;
          top: 0;
          right: 0;
        }
      }
      .sub-col {
        width: 27.5rem;
        overflow: hidden;
        padding-top: 7.5rem;
        padding-left: 5.62rem;
        position: relative;
        top: 0;
      }
    }
  }

  .fLink {
    width: 100%;
    color: $black;
    overflow: hidden;
    opacity: 0.8;
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
    text-decoration: none;
    display: inline-block;
    gap: 0.75rem;
    position: relative;
    transition: all 0.45s ease;

    @include flex(space-between, center);
    @include clamp-property("font-size", 1.5, 2.5);
    @include clamp-property("letter-spacing", -0.03, -0.05);

    svg path {
      transition: all 0.45s ease;
    }

    &::after {
      content: "";
      position: absolute;
      @include clamp-property("width", 2, 3);

      height: 1px;
      background: $shade-3;
      margin-right: 0.75;
      top: 50%;
      left: 0;
      transform: translateX(-100%);
      transition: transform 0.45s ease;
    }

    &:hover {
      @include clamp-property("padding-left", 2.75, 3.75);

      color: $shade-3;

      svg path {
        stroke: $shade-3;
      }

      &::after {
        transform: translateX(0%);
      }
    }

    svg {
      @include clamp-property("width", 1.25, 1.25);
      @include clamp-property("height", 1.25, 1.25);
      transform: rotate(-90deg);
    }

    @media screen and (min-width: 1024px) {
      justify-content: start;
    }
  }

  .fLink.active {
    color: $shade-3;
    @include clamp-property("padding-left", 2.75, 3.75);

    svg path {
      stroke: $shade-3;
    }

    &::after {
      transform: translateX(0%);
    }
  }

  .sLink {
    color: $black;
    opacity: 0.8;
    font-style: normal;
    font-weight: 300;
    line-height: 120%;
    text-decoration: none;
    display: inline-block;
    transition: all 0.45s ease;
    position: relative;
    overflow: hidden;

    @include flex(space-between, center);
    gap: 0.75rem;
    @include clamp-property("font-size", 1.25, 2);
    @include clamp-property("letter-spacing", -0.025, -0.04);

    &:hover {
      color: $shade-3;
    }

    &::after {
      content: "";
      position: absolute;
      @include clamp-property("width", 2, 3);

      height: 1px;
      background: $shade-3;
      margin-right: 0.75;
      top: 50%;
      left: 0;
      transform: translateX(-100%);
      transition: transform 0.45s ease;
    }

    &:hover {
      @include clamp-property("padding-left", 2.75, 3.75);

      color: $shade-3;

      svg path {
        stroke: $shade-3;
      }

      &::after {
        transform: translateX(0%);
      }
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: clip-path 0.5s ease;
}

.menu-enter-from {
  clip-path: inset(0% 100% 0% 0%);
}

.menu-enter-to {
  clip-path: inset(0% 0% 0% 0%);
}

.menu-leave-from {
  clip-path: inset(0% 0% 0% 0%);
}

.menu-leave-to {
  clip-path: inset(0% 100% 0% 0%);
}
</style>
