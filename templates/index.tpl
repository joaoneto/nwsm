<nfw-repeat data-bind="process in processes">
  <template>
    <div data-bind="process.name" data-visible="teste===1"></div>
    <div data-bind="process.cpu" data-visible="teste===123"></div>
    <div data-bind="process.mem" data-visible="teste==='123'"></div>
  </template>
</nfw-repeat>
