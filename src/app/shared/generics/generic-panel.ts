export abstract class GenericPanelComponent {
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  public mouseout(): void {
    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public onHover(i: number) {
    this.hoveredIndex = i;
  }

  public onClose(): void {
    setTimeout(() => {
      this.selectedIndex = null;
    }, 100);
  }

  public onClickPnl(pnl: any, event: any, i: number): void {
    event.preventDefault();
    const classList = event.target.parentNode.classList;
    this.selectedIndex = null;
    if (classList.contains('actions-item')) {
      pnl.close();
      this.selectedIndex = i;
    }
  }
}
