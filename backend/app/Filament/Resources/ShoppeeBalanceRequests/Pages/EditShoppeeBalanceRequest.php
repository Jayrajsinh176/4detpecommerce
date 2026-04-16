<?php

namespace App\Filament\Resources\ShoppeeBalanceRequests\Pages;

use App\Filament\Resources\ShoppeeBalanceRequests\ShoppeeBalanceRequestResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditShoppeeBalanceRequest extends EditRecord
{
    protected static string $resource = ShoppeeBalanceRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
