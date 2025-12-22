import { ArrowLeft, ArrowRight } from "iconsax-react";

import { Button } from "#/components/button/Button";
import { useListItemContext } from "#/components/landing/list-item/contexts/ListItemContext";
import Icon from "#/components/icon/Icon";

export default function PaginationControl() {
  const context = useListItemContext();

  const currentPage = context.currentPage ?? 1;
  const maxPage = context.maxPage ?? 1;
  const disabledPrev = currentPage === 1;
  const disabledNext = currentPage === maxPage;

  return (
    <div className="flex w-fit shrink-0 items-center gap-3">
      <Button
        color="secondary"
        variant="outline"
        type="button"
        className="size-[2.5rem] px-0"
        onClick={() => context?.handlePrevPage?.()}
        isDisabled={disabledPrev}
      >
        <Icon icon={ArrowLeft} className="size-[1.125rem]" />
      </Button>
      <Button
        color="secondary"
        variant="outline"
        className="size-[2.5rem] px-0"
        onClick={() => context?.handleNextPage?.()}
        type="button"
        isDisabled={disabledNext}
      >
        <Icon icon={ArrowRight} className="size-[1.125rem]" />
      </Button>
    </div>
  );
}
