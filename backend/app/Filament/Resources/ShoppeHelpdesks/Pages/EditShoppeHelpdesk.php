<?php

namespace App\Filament\Resources\ShoppeHelpdesks\Pages;

use App\Filament\Resources\ShoppeHelpdesks\ShoppeHelpdeskResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditShoppeHelpdesk extends EditRecord
{
    protected static string $resource = ShoppeHelpdeskResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    // ✅ AUTO STATUS CHANGE LOGIC
    protected function mutateFormDataBeforeSave(array $data): array
    {
        // If admin gives reply → set status to OPEN
        if (!empty($data['admin_reply'])) {
            $data['status'] = 'open';
        }

        return $data;
    }
}