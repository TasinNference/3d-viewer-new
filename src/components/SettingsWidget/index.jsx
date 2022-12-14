import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  SettingsBody,
  SettingsContainer,
  SettingsContent,
  SettingsHeader,
} from "./styles";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import CustomSlider from "../CustomSlider";
import { GrPowerReset } from "react-icons/gr";

const SettingsWidget = ({
  opacity,
  setOpacity,
  rotation,
  setRotation,
  spacing,
  setSpacing,
  resetImages,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <SettingsContainer>
      <SettingsHeader onClick={() => setOpen(!open)}>
        <Typography variant="subtitle2">Settings</Typography>
        {open ? (
          <AiOutlineMinusSquare size={20} />
        ) : (
          <AiOutlinePlusSquare size={20} />
        )}
      </SettingsHeader>
      <SettingsBody open={open}>
        <SettingsContent>
          <table>
            <tbody>
              <tr>
                <td>
                  <Typography variant="caption">Opacity</Typography>
                </td>
                <td>
                  <CustomSlider
                    size="small"
                    defaultValue={opacity}
                    min={1}
                    max={100}
                    onChange={(e) => setOpacity(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="caption">Spacing</Typography>
                </td>
                <td>
                  <CustomSlider
                    size="small"
                    defaultValue={spacing}
                    value={spacing}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={50}
                    max={500}
                    onChange={(e) => setSpacing(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="caption">Rotation</Typography>
                </td>
                <td>
                  <CustomSlider
                    size="small"
                    defaultValue={rotation}
                    value={rotation}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={0}
                    max={360}
                    onChange={(e) => setRotation(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Typography variant="caption">Reset</Typography>
                </td>
                <td style={{ display: "flex", justifyContent: "flex-end" }}>
                  <GrPowerReset
                    style={{ cursor: "pointer" }}
                    onClick={resetImages}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </SettingsContent>
      </SettingsBody>
    </SettingsContainer>
  );
};

export default SettingsWidget;
