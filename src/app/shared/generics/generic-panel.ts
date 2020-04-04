export abstract class GenericPanelComponent {
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;

  public mouseout(): void {
    if (this.selectedIndex != null) return;

    this.hoveredIndex = null;
    this.selectedIndex = null;
  }

  public onHover(i: number) {
    if (this.selectedIndex == null)
      this.hoveredIndex = i;

    console.log(this.hoveredIndex, this.selectedIndex);
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
    if (classList.contains('menu-icon') || classList.contains('no-expand')) {
      pnl.close();
      this.selectedIndex = i;
    }
  }
}
