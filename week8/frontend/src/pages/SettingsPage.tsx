
import FeedLayout from "../components/layout/FeedLayout";
import EditProfileTab from "../components/settings/EditProfileTab";
import ChangePasswordTab from "../components/settings/ChangePasswordTab";
import {
  SettingsWrapper,
  SettingsCard
} from "../styles/pages/settingsPageStyles";

const SettingsPage = () => {
  return (
    <FeedLayout>
      <SettingsWrapper>

        <SettingsCard>
          <EditProfileTab />
        </SettingsCard>

        <SettingsCard>
          <ChangePasswordTab />
        </SettingsCard>

      </SettingsWrapper>
    </FeedLayout>
  );
};

export default SettingsPage;
