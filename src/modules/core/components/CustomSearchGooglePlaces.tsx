import { Autocomplete, Libraries, useLoadScript } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useState } from "react";

import CustomInputField from "./CustomInputField";
import { FormikTouched, useFormikContext } from "formik";
import { RiDeleteBin6Line } from "../../../utils/icons";
import { GOOGLE_PLACES_LIBRARIES } from "../../../utils/cons";
import IconButton from "./IconButton";
import { LocationSvgs } from "../../../utils/svgIcons";
import { SignupFieldNames, SignupFormType } from "../../../types/signupTypes";
import { useTranslation } from "react-i18next";

const CustomSearchGooglePlaces = ({
  helperText,
  touched,
  values,
  setHelperText,
}: {
  helperText?: string;
  touched: FormikTouched<SignupFormType>;
  values: SignupFormType;
  setHelperText: Dispatch<SetStateAction<string>>;
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY ?? "",
    libraries: GOOGLE_PLACES_LIBRARIES as Libraries | undefined,
  });
  //**places.js:50 As of March 1st, 2025, google.maps.places.Autocomplete is not available to new customers. Please use google.maps.places.PlaceAutocompleteElement instead. At this time, google.maps.places.Autocomplete is not scheduled to be discontinued, but google.maps.places.PlaceAutocompleteElement is recommended over google.maps.places.Autocomplete. While google.maps.places.Autocomplete will continue to receive bug fixes for any major regressions, existing bugs in google.maps.places.Autocomplete will not be addressed. At least 12 months notice will be given before support is discontinued. Please see https://developers.google.com/maps/legacy for additional details and https://developers.google.com/maps/documentation/javascript/places-migration-overview for the migration guide. */
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [center, setCenter] = useState<
    undefined | { lat: number; lng: number }
  >(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="flex flex-row items-center max-md:flex-col">
        {center !== undefined || !isLoaded ? (
          <div className="flex flex-col w-full items-start">
            <p className={`text-sm font-normal text-hhGrayShades-label mb-2`}>
              {t("searchAddress")}
            </p>
            <div
              className={`flex items-center justify-between bg-white h-max border-[1px] shadow-input-field-light border-hhGrayShades-borderGray mb-4 p-2
               w-full rounded-lg flex-row`}
            >
              <p className="text-text-black text-xs text-start">
                {!isLoaded ? t("loading") : searchText}
              </p>
              {isLoaded && (
                <IconButton
                  icon={<RiDeleteBin6Line className="pr-1 text-2xl" />}
                  onClick={() => {
                    setCenter(undefined);
                    setSearchText("");
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <Autocomplete
            className="w-full"
            restrictions={{ country: ["sa"] }}
            onLoad={setSearchResult}
            onPlaceChanged={async () => {
              if (searchResult != null) {
                const place = searchResult.getPlace();
                if (place.geometry && place.geometry.location) {
                  setCenter({
                    lat: place.geometry!.location.lat(),
                    lng: place.geometry!.location.lng(),
                  });
                  setFieldValue(SignupFieldNames.location, [
                    { coordinates: place.geometry!.location.lat() },
                    { coordinates: place.geometry!.location.lng() },
                  ]);
                  setFieldValue("address", place.formatted_address ?? "");
                  setSearchText(`${place.formatted_address ?? ""}`);
                  setHelperText("");
                }
              } else {
                alert(t("pleaseSelectFromListOfPlaces"));
              }
            }}
          >
            <CustomInputField
              fullWidth
              helperText={
                touched.address && values.address.trim().length === 0
                  ? t("pleaseEnterLocation")
                  : helperText && helperText?.length > 0
                  ? helperText
                  : null
              }
              label={t("searchAddress")}
              disabled={center !== undefined}
              defaultValue={searchText}
              onChange={handleChange}
              suffix={<LocationSvgs />}
              onBlur={() => {
                setFieldTouched(SignupFieldNames.address);
              }}
            />
          </Autocomplete>
        )}
      </div>
    </div>
  );
};

export default CustomSearchGooglePlaces;
