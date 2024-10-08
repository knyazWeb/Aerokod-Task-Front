interface containerOptions {
  id: string;
  mountNode?: HTMLElement;
}

export const createPortalContainer = (options: containerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement('div');

  portalContainer.setAttribute('id', id);
  mountNode.appendChild(portalContainer);
};
