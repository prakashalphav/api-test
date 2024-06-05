import type { PropFunction, Component } from '@builder.io/qwik';
import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './Pagination1.scss?inline';
// import { Button as HeadlessButton } from '@qwik-ui/primitives';
import { ArrowLeft } from '~/components/icons/ArrowLeft';
import { ArrowRight } from '~/components/icons/ArrowRight';
import { ArrowFirstIcon } from '~/components/icons/ArrowFirst';
import { ArrowLastIcon } from '~/components/icons/ArrowLast';
import FormInput from "~/components/form-input/variant-1/FormInput1";

/**
 * PAGINATION TODOs
 * - Get storybook testing to work
 *
 * PROPS
 * pageIndex: default pagination value
 * V activeStyles: The styles of the active page button
 * V normalStyles: The styles of the inactive page buttons
 * V customArrowTexts: { previous, next }
 * disabled: enable/disable paginator
 * color: primary | secondary
 * variant: outlined (show border without bg)
 * shape: rounded | square
 * size: 'sm' | 'md' | 'lg'
 * paginationRange (see https://mui.com/material-ui/react-pagination/#pagination-ranges)
 *
 */
export interface PaginationProps extends PaginationOptions {
  pages: number;
  page: number;
  rowsPerPage: number;
  onPaging$: PropFunction<(index: number) => void>;
  RenderItem?: Component<PaginationButtonProps>;
  RenderDivider?: Component<object>;
  componentClass? : string;
}

export interface PaginationOptions {
  boundaryCount?: number;
  siblingCount?: number;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  activeClass?: string;
  defaultClass?: string;
  labels?: PaginationButtonLabels;
}

export interface PaginationButtonProps {
  onClick$: PropFunction<() => void>;
  disabled?: boolean;
  'aria-label': string;
  'aria-current'?: boolean;
  key?: string | number;
  activeClass?: string;
  defaultClass?: string;
  value: PaginationButtonValue;
  labels?: PaginationButtonLabels;
}

export type PaginationButtonValue =
  | 'prev'
  | 'next'
  | 'first'
  | 'last'
  // | 'divider'
  // | 'start-ellipsis'
  // | 'end-ellipsis'
  | number
  | string;

export interface PaginationButtonLabels {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const getPaginationButtons = (
  page: number,
  count: number,
  labels: PaginationButtonLabels | undefined,
  {
    boundaryCount = 1,
    siblingCount = 1,
    hidePrevButton,
    hideNextButton,
    showFirstButton = true,
    showLastButton = true,
  }: PaginationOptions
): PaginationButtonValue[] => {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      page - siblingCount, // Natural start
      count - boundaryCount - siblingCount * 2 - 1 // Lower boundary when page is high
    ),
    boundaryCount + 2 // Greater than startPages
  );

  const siblingsEnd = Math.min(
    Math.max(
      page + siblingCount, // Natural end
      boundaryCount + siblingCount * 2 + 2 // Upper boundary when page is low
    ),
    endPages.length > 0 ? endPages[0] - 2 : count - 1 // Less than endPages
  );

  const items = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['prev']),
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ['divider']
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    ...range(siblingsStart, siblingsEnd),

    ...(siblingsEnd < count - boundaryCount - 1
      ? ['divider']
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ];

  return items;
};

export const PaginationButton = component$(
  ({
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent,
    disabled,
    onClick$,
    key,
    value,
    defaultClass,
    activeClass,
  }: PaginationButtonProps) => {
    useStylesScoped$(styles);
    
    let displayValue;
    let displayClass = ariaCurrent ? activeClass + ' selected-page' : defaultClass;
    switch (value) {
        case 'first':
            displayValue = <ArrowFirstIcon></ArrowFirstIcon>;
            displayClass += ' navigation-arrows';
            break;
        case 'prev':
            displayValue = <ArrowLeft></ArrowLeft>;
            displayClass += ' navigation-arrows';
            break;
        case 'next':
            displayValue = <ArrowRight></ArrowRight>;
            displayClass += ' navigation-arrows';
            break;
        case 'last':
            displayValue = <ArrowLastIcon></ArrowLastIcon>;
            displayClass += ' navigation-arrows';
            break;
        default:
            displayValue = value;
            displayClass += ' navigation-numbers';
            break;
    }
    return (
      <button
        onClick$={onClick$}
        aria-label={ariaLabel}
        disabled={disabled}
        key={key}
        class={displayClass}
      >
        {displayValue}
      </button>
    );
  }
);

export const PaginationDivider = component$(() => {
  return <span>...</span>;
});

/**
 * Pagination
 * ----------
 * A pagination component
 * first page is 1
 *
 * @example
 * <Pagination pages={15} page={store.page} onPaging$={incrementCount} />
 */
export const Pagination = component$(
  ({
    RenderItem = PaginationButton,
    RenderDivider = PaginationDivider,
    onPaging$,
    page,
    pages,
    rowsPerPage = 5,
    activeClass,
    defaultClass,
    labels,
    componentClass,
    ...rest
  }: PaginationProps) => {
    
    const _onPaging$ = $((page: number) => {
      if (page < 1 || page > pages) return;
      onPaging$(page);
    });

    const itemClickHandler = $((item: PaginationButtonValue) =>
      _onPaging$(
        (() => {
          switch (item) {
            case 'first':
              return 1;
            case 'prev':
              return page - 1;
            case 'next':
              return page + 1;
            case 'last':
              return pages;
            default:
              if (typeof item === 'number') return item;
              return page;
          }
        })()
      )
    );

    const items = getPaginationButtons(page, pages, labels, rest);

    return (
      <>
      <div class={`flex flex-wrap ${componentClass} min-w-full`}>
        {items.map((item, i) => {
          return (
            <>
              {item === 'divider' ? (
                <RenderDivider key={i} />
              ) : (
                <RenderItem
                  activeClass={activeClass}
                  defaultClass={defaultClass}
                  key={i}
                  labels={labels}
                  onClick$={() => itemClickHandler(item)}
                  disabled={
                    (['prev', 'first'].includes(item.toString()) &&
                      page === 1) ||
                    (['next', 'last'].includes(item.toString()) &&
                      page === pages)
                  }
                  aria-label={`Page ${item}`}
                  aria-current={item === page}
                  value={item}
                />
              )}
            </>
          );
        })}
        <div class="flex flex-center gap-2 flex-auto ">
           
          <label for="pagi_rows_per_page" class="shrink-0 text-xs">
            Records Per Page
          </label>
          <div class="w-15 flex-auto">
          <FormInput {...{
              id:"pagi_rows_per_page",
 
              type: "number",
              placeholder: "",
              required: true,
              disabled: false,
              readonly: false,
              min: 5,
              max: 100,
              numberInputClass: "pagination",
              value: rowsPerPage,
              name: "test_number",  
              onInput$: (ev: Event) => { 
                if (ev.target) {
                  const enteredValue = ev.target.valueAsNumber;
                  if (typeof enteredValue === 'number' && enteredValue >= 5 && enteredValue <= 100) {
                    onPaging$(1, ev.target?.valueAsNumber);
                  } else {
                    ev.target.value = 5;
                  }
                }
              }
          }} ></FormInput>
         </div>
        </div>
     
     </div>
      </>
    );
  }
);