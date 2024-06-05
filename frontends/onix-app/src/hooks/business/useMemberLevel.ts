import { useSignal , $} from '@builder.io/qwik';

export const init = (selLevel: Record<string, null> | undefined, levelSettings: Record<string, null>[] | undefined) => {
 
    const allLevelSetting = useSignal<Record<string, null>[] | undefined>(levelSettings);
    const selLevelView = useSignal<Record<string, null> | undefined>(selLevel);

    const chg_level = $((level_id: number) => {
        if (allLevelSetting.value && level_id > -1) {
            selLevelView.value = allLevelSetting.value[level_id];
        }
    });

    return { allLevelSetting ,selLevelView, chg_level }
}
