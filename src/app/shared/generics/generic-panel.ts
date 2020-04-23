export abstract class GenericRowComponent<T = null> {
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  public mouseout(): void {
    if (this.selectedIndex != null) return;

    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public mouseover(i: number, colIndctr?: number) {
    if (this.selectedIndex == null)
      this.hoveredIndex = i;
  }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  public onSave(event: T): void {
    console.log(event);
  }

  public onInput = (event: any, element: any): void => {
    setTimeout(() => {
      element = Object.assign({}, event.target.value);
      console.log(element);
    }, 100);
  };

  public onClickPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    this.selectedIndex = null;
    if (classList.contains('menu-icon') || classList.contains('no-expand')) {
      pnl.close();
      this.selectedIndex = i;
    }
  }
}
