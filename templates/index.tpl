<repeat data-bind="process in processes">
  <div>
    <div data-bind="process.name"></div>
    <div data-bind="process.cpu"></div>
    <div data-bind="process.mem"></div>
  </div>
</repeat>
