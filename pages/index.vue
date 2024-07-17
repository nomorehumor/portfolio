
<template>
  <div>
  <main class="absolute w-full h-full flex flex-col place-items-center bg-[#121212] text-zinc-300">
    <SideBar></SideBar>
    <div class="text-6xl text-center mt-20 font-extrabold">👋 Hello, my name is Maxim Popov</div>
    <div class="flex mt-14 gap-20">
      <BriefInfo></BriefInfo>
      <div class="flex flex-col place-items-center">
        <div class="text-2xl text-center font-bold text-zinc-500">Take a look at what I did so far:</div>
        <SkillCircle class="mt-16"></SkillCircle>
        <SearchBar class="mt-14"></SearchBar>
        <FilterButtonPanel class="mt-8"></FilterButtonPanel>
        <!-- <BackgroundWaves color="#606060" :strength="0.15"></BackgroundWaves> -->
      </div>
    </div>
  </main>
  <footer class="absolute bottom-0 text-zinc-600">
    <a target="_blank" href="https://icons8.com/icon/447/linkedin">LinkedIn</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
  </footer>
</div>
</template>

<style scoped>

main {
  z-index: -2;
}

@media (min-width: 1024px) {
  
}
  /* .project-block:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: 
                radial-gradient(from 351deg,var(--c) 98%,#0000) top/var(--b) var(--b) no-repeat,
                conic-gradient(from 351deg, var(--c) calc(var(--p)*1%), #0000 0);
    -webkit-mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
            mask:radial-gradient(farthest-side,#0000 calc(99% - var(--b)),#000 calc(100% - var(--b)));
  
  } */
</style>
